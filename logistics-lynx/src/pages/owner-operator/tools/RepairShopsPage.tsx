/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { Wrench, Plus, Search, Filter, Star, Phone, Clock, MapPin, Calendar, CheckCircle, AlertTriangle, Heart, HeartOff, Navigation } from 'lucide-react';
import { toast } from "sonner";

interface RepairShop {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  website?: string;
  distance: number;
  rating: number;
  totalReviews: number;
  specialties: string[];
  services: string[];
  operatingHours: {
    [key: string]: string;
  };
  isOpen: boolean;
  emergencyService: boolean;
  mobileSevice: boolean;
  certification: string[];
  priceRange: '$' | '$$' | '$$$';
  isFavorite: boolean;
  averageRepairTime: string;
  lastUpdated: string;
  workOrderCapacity: 'low' | 'medium' | 'high';
  acceptsInsurance: boolean;
  paymentMethods: string[];
}

const mockRepairShops: RepairShop[] = [
  {
    id: 'rs-001',
    name: 'Midwest Truck & Trailer Repair',
    address: '2145 W 95th St',
    city: 'Evergreen Park',
    state: 'IL',
    zipCode: '60805',
    phone: '(708) 425-2800',
    website: 'www.midwesttruckrepair.com',
    distance: 1.8,
    rating: 4.5,
    totalReviews: 234,
    specialties: ['Engine Repair', 'Transmission', 'Brake Systems', 'Electrical'],
    services: ['Diagnostics', 'Oil Changes', 'Tire Service', 'DOT Inspections', 'Emissions Testing'],
    operatingHours: {
      'Monday': '7:00 AM - 6:00 PM',
      'Tuesday': '7:00 AM - 6:00 PM',
      'Wednesday': '7:00 AM - 6:00 PM',
      'Thursday': '7:00 AM - 6:00 PM',
      'Friday': '7:00 AM - 6:00 PM',
      'Saturday': '8:00 AM - 4:00 PM',
      'Sunday': 'Closed'
    },
    isOpen: true,
    emergencyService: true,
    mobileSevice: false,
    certification: ['ASE Certified', 'DOT Approved', 'FMCSA Compliant'],
    priceRange: '$$',
    isFavorite: true,
    averageRepairTime: '2-4 hours',
    lastUpdated: '2024-07-19 14:30',
    workOrderCapacity: 'medium',
    acceptsInsurance: true,
    paymentMethods: ['Cash', 'Credit Cards', 'Fleet Cards', 'Check']
  },
  {
    id: 'rs-002',
    name: 'Interstate Diesel Service',
    address: '4521 S Cicero Ave',
    city: 'Chicago',
    state: 'IL',
    zipCode: '60632',
    phone: '(773) 582-9100',
    website: 'www.interstatediesel.com',
    distance: 3.2,
    rating: 4.2,
    totalReviews: 189,
    specialties: ['Diesel Engine', 'Turbocharger', 'Fuel Systems', 'Air Conditioning'],
    services: ['Engine Diagnostics', 'DPF Cleaning', 'Injector Service', 'Cooling System', 'Suspension'],
    operatingHours: {
      'Monday': '6:00 AM - 8:00 PM',
      'Tuesday': '6:00 AM - 8:00 PM',
      'Wednesday': '6:00 AM - 8:00 PM',
      'Thursday': '6:00 AM - 8:00 PM',
      'Friday': '6:00 AM - 8:00 PM',
      'Saturday': '7:00 AM - 5:00 PM',
      'Sunday': '9:00 AM - 3:00 PM'
    },
    isOpen: true,
    emergencyService: true,
    mobileSevice: true,
    certification: ['ASE Master Certified', 'Cummins Authorized', 'Caterpillar Certified'],
    priceRange: '$$$',
    isFavorite: false,
    averageRepairTime: '1-3 hours',
    lastUpdated: '2024-07-19 13:45',
    workOrderCapacity: 'high',
    acceptsInsurance: true,
    paymentMethods: ['Cash', 'Credit Cards', 'Fleet Cards', 'Financing Available']
  },
  {
    id: 'rs-003',
    name: 'Quick Fix Mobile Truck Repair',
    address: 'Mobile Service',
    city: 'Chicago Metro',
    state: 'IL',
    zipCode: '60601',
    phone: '(312) 555-0199',
    distance: 0.0,
    rating: 4.7,
    totalReviews: 156,
    specialties: ['Emergency Repairs', 'Roadside Service', 'Tire Changes', 'Battery Service'],
    services: ['24/7 Emergency', 'Mobile Diagnostics', 'Jump Start', 'Lockout Service', 'Fuel Delivery'],
    operatingHours: {
      'Monday': '24/7',
      'Tuesday': '24/7',
      'Wednesday': '24/7',
      'Thursday': '24/7',
      'Friday': '24/7',
      'Saturday': '24/7',
      'Sunday': '24/7'
    },
    isOpen: true,
    emergencyService: true,
    mobileSevice: true,
    certification: ['ASE Certified', 'Emergency Response Certified'],
    priceRange: '$$$',
    isFavorite: true,
    averageRepairTime: '30-90 minutes',
    lastUpdated: '2024-07-19 15:15',
    workOrderCapacity: 'medium',
    acceptsInsurance: false,
    paymentMethods: ['Cash', 'Credit Cards']
  },
  {
    id: 'rs-004',
    name: 'Southside Heavy Duty Repair',
    address: '8934 S State St',
    city: 'Chicago',
    state: 'IL',
    zipCode: '60619',
    phone: '(773) 928-4500',
    website: 'www.southsideheavyduty.com',
    distance: 6.7,
    rating: 4.0,
    totalReviews: 298,
    specialties: ['Heavy Duty Engines', 'Differential Repair', 'Frame Welding', 'Hydraulic Systems'],
    services: ['Major Overhauls', 'Fabrication', 'Painting', 'Towing Service', 'Parts Sales'],
    operatingHours: {
      'Monday': '7:30 AM - 5:30 PM',
      'Tuesday': '7:30 AM - 5:30 PM',
      'Wednesday': '7:30 AM - 5:30 PM',
      'Thursday': '7:30 AM - 5:30 PM',
      'Friday': '7:30 AM - 5:30 PM',
      'Saturday': '8:00 AM - 12:00 PM',
      'Sunday': 'Closed'
    },
    isOpen: false,
    emergencyService: false,
    mobileSevice: false,
    certification: ['ASE Certified', 'AWS Welding Certified', 'NATEF Accredited'],
    priceRange: '$',
    isFavorite: false,
    averageRepairTime: '4-8 hours',
    lastUpdated: '2024-07-19 12:20',
    workOrderCapacity: 'low',
    acceptsInsurance: true,
    paymentMethods: ['Cash', 'Credit Cards', 'Fleet Cards', 'Check', 'Net 30']
  },
  {
    id: 'rs-005',
    name: 'Express Truck Maintenance',
    address: '1567 W 47th St',
    city: 'Chicago',
    state: 'IL',
    zipCode: '60609',
    phone: '(773) 247-8800',
    distance: 4.1,
    rating: 4.3,
    totalReviews: 167,
    specialties: ['Preventive Maintenance', 'DOT Inspections', 'Fleet Services', 'Tire Service'],
    services: ['Oil Changes', 'Brake Service', 'PM Services', 'Safety Inspections', 'Fleet Contracts'],
    operatingHours: {
      'Monday': '6:00 AM - 7:00 PM',
      'Tuesday': '6:00 AM - 7:00 PM',
      'Wednesday': '6:00 AM - 7:00 PM',
      'Thursday': '6:00 AM - 7:00 PM',
      'Friday': '6:00 AM - 7:00 PM',
      'Saturday': '7:00 AM - 3:00 PM',
      'Sunday': 'Closed'
    },
    isOpen: true,
    emergencyService: false,
    mobileSevice: false,
    certification: ['ASE Certified', 'DOT Inspector', 'Fleet Maintenance Certified'],
    priceRange: '$',
    isFavorite: false,
    averageRepairTime: '1-2 hours',
    lastUpdated: '2024-07-19 14:00',
    workOrderCapacity: 'high',
    acceptsInsurance: true,
    paymentMethods: ['Cash', 'Credit Cards', 'Fleet Cards', 'Fleet Billing']
  }
];

const RepairShopsPage: React.FC = () => {
  const [repairShops, setRepairShops] = useState<RepairShop[]>(mockRepairShops);
  const [searchTerm, setSearchTerm] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState<string>('all');
  const [priceFilter, setPriceFilter] = useState<string>('all');
  const [availabilityFilter, setAvailabilityFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('distance');
  const [selectedShop, setSelectedShop] = useState<RepairShop | null>(null);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const filteredShops = repairShops
    .filter(shop => {
      const matchesSearch = shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           shop.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           shop.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesSpecialty = specialtyFilter === 'all' || 
                              shop.specialties.some(s => s.toLowerCase().includes(specialtyFilter.toLowerCase()));
      const matchesPrice = priceFilter === 'all' || shop.priceRange === priceFilter;
      const matchesAvailability = availabilityFilter === 'all' ||
                                 (availabilityFilter === 'open' && shop.isOpen) ||
                                 (availabilityFilter === 'emergency' && shop.emergencyService) ||
                                 (availabilityFilter === 'mobile' && shop.mobileSevice);
      const matchesFavorites = !showFavoritesOnly || shop.isFavorite;
      
      return matchesSearch && matchesSpecialty && matchesPrice && matchesAvailability && matchesFavorites;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'distance':
          return a.distance - b.distance;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price':
          return a.priceRange.length - b.priceRange.length;
        default:
          return 0;
      }
    });

  const handleToggleFavorite = (id: string) => {
    setRepairShops(shops =>
      shops.map(shop =>
        shop.id === id ? { ...shop, isFavorite: !shop.isFavorite } : shop
      )
    );
    toast.success('Favorites updated');
  };

  const handleGetDirections = (shop: RepairShop) => {
    const address = `${shop.address}, ${shop.city}, ${shop.state} ${shop.zipCode}`;
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
    window.open(googleMapsUrl, '_blank');
    toast.success('Opening directions in Google Maps');
  };

  const handleCallShop = (phone: string) => {
    window.open(`tel:${phone}`);
    toast.success('Initiating call');
  };

  const handleScheduleService = (shopId: string) => {
    toast.success('Service scheduling feature coming soon');
  };

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const getPriceDisplay = (priceRange: string) => {
    return priceRange;
  };

  const getCapacityColor = (capacity: string) => {
    switch (capacity) {
      case 'high': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getCurrentDayHours = (hours: { [key: string]: string }) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = days[new Date().getDay()];
    return hours[today] || 'Closed';
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Repair Shops</h1>
        <p className="text-muted-foreground">Find qualified truck repair shops and maintenance services</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Nearby Shops</p>
                <p className="text-2xl font-bold text-foreground">{filteredShops.length}</p>
              </div>
              <Wrench className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Open Now</p>
                <p className="text-2xl font-bold text-foreground">
                  {repairShops.filter(shop => shop.isOpen).length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Emergency Service</p>
                <p className="text-2xl font-bold text-foreground">
                  {repairShops.filter(shop => shop.emergencyService).length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Mobile Service</p>
                <p className="text-2xl font-bold text-foreground">
                  {repairShops.filter(shop => shop.mobileSevice).length}
                </p>
              </div>
              <MapPin className="h-8 w-8 text-purple-600" />
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
                  placeholder="Search by name, location, or specialty..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Filter by specialty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Specialties</SelectItem>
                <SelectItem value="engine">Engine Repair</SelectItem>
                <SelectItem value="transmission">Transmission</SelectItem>
                <SelectItem value="brake">Brake Systems</SelectItem>
                <SelectItem value="electrical">Electrical</SelectItem>
                <SelectItem value="diesel">Diesel Engine</SelectItem>
                <SelectItem value="emergency">Emergency Repairs</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priceFilter} onValueChange={setPriceFilter}>
              <SelectTrigger className="w-full lg:w-32">
                <SelectValue placeholder="Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="$">$ - Budget</SelectItem>
                <SelectItem value="$$">$$ - Moderate</SelectItem>
                <SelectItem value="$$$">$$$ - Premium</SelectItem>
              </SelectContent>
            </Select>
            <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="open">Open Now</SelectItem>
                <SelectItem value="emergency">Emergency Service</SelectItem>
                <SelectItem value="mobile">Mobile Service</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full lg:w-32">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="distance">Distance</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="price">Price</SelectItem>
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

      {/* Repair Shops Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredShops.map((shop) => (
          <Card key={shop.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {shop.name}
                    <Badge variant={shop.isOpen ? "default" : "secondary"} className={shop.isOpen ? "bg-green-100 text-green-800 hover:bg-green-200" : ""}>
                      {shop.isOpen ? 'Open' : 'Closed'}
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    {shop.mobileSevice ? 'Mobile Service' : `${shop.address}, ${shop.city}, ${shop.state}`}
                  </CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleToggleFavorite(shop.id)}
                >
                  {shop.isFavorite ? (
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
                  <div className="font-semibold">
                    {shop.distance === 0 ? 'Mobile' : `${shop.distance} miles`}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Price Range</div>
                  <div className="font-semibold">{getPriceDisplay(shop.priceRange)}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Rating</div>
                  <div className="flex items-center gap-1">
                    {getRatingStars(shop.rating)}
                    <span className="text-sm text-muted-foreground ml-1">
                      ({shop.totalReviews})
                    </span>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Capacity</div>
                  <div className={`font-semibold ${getCapacityColor(shop.workOrderCapacity)}`}>
                    {shop.workOrderCapacity.charAt(0).toUpperCase() + shop.workOrderCapacity.slice(1)}
                  </div>
                </div>
              </div>

              {/* Specialties */}
              <div>
                <div className="text-sm text-muted-foreground mb-2">Specialties</div>
                <div className="flex flex-wrap gap-1">
                  {shop.specialties.slice(0, 3).map((specialty, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">{specialty}</Badge>
                  ))}
                  {shop.specialties.length > 3 && (
                    <Badge variant="outline" className="text-xs">+{shop.specialties.length - 3} more</Badge>
                  )}
                </div>
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-1">
                {shop.emergencyService && <Badge variant="destructive" className="text-xs">Emergency</Badge>}
                {shop.mobileSevice && <Badge variant="default" className="bg-purple-100 text-purple-800 hover:bg-purple-200 text-xs">Mobile</Badge>}
                {shop.acceptsInsurance && <Badge variant="secondary" className="text-xs">Insurance</Badge>}
              </div>

              {/* Operating Hours */}
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{getCurrentDayHours(shop.operatingHours)}</span>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => handleGetDirections(shop)}
                  className="flex items-center gap-1"
                  disabled={shop.mobileSevice}
                >
                  <Navigation className="h-4 w-4" />
                  Directions
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCallShop(shop.phone)}
                  className="flex items-center gap-1"
                >
                  <Phone className="h-4 w-4" />
                  Call
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedShop(shop)}
                >
                  Details
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleScheduleService(shop.id)}
                  className="flex items-center gap-1"
                >
                  <Calendar className="h-4 w-4" />
                  Schedule
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed View Dialog */}
      <Dialog open={!!selectedShop} onOpenChange={() => setSelectedShop(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedShop && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Wrench className="h-5 w-5" />
                  {selectedShop.name}
                </DialogTitle>
                <DialogDescription>
                  Complete repair shop information and services
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Header Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="pt-4">
                      <div className="text-sm text-muted-foreground">Address</div>
                      <div className="font-semibold">
                        {selectedShop.mobileSevice ? (
                          'Mobile Service Available'
                        ) : (
                          <>
                            {selectedShop.address}<br />
                            {selectedShop.city}, {selectedShop.state} {selectedShop.zipCode}
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-4">
                      <div className="text-sm text-muted-foreground">Contact</div>
                      <div className="font-semibold">{selectedShop.phone}</div>
                      {selectedShop.website && (
                        <div className="text-sm text-blue-600">{selectedShop.website}</div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="pt-4 text-center">
                      <div className="text-2xl font-bold text-foreground">{selectedShop.rating}</div>
                      <div className="text-sm text-muted-foreground">{selectedShop.totalReviews} Reviews</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-4 text-center">
                      <div className="text-2xl font-bold text-foreground">{selectedShop.priceRange}</div>
                      <div className="text-sm text-muted-foreground">Price Range</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-4 text-center">
                      <div className="text-2xl font-bold text-foreground">{selectedShop.averageRepairTime}</div>
                      <div className="text-sm text-muted-foreground">Avg Repair Time</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-4 text-center">
                      <div className={`text-2xl font-bold ${getCapacityColor(selectedShop.workOrderCapacity)}`}>
                        {selectedShop.workOrderCapacity.toUpperCase()}
                      </div>
                      <div className="text-sm text-muted-foreground">Capacity</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Specialties */}
                <Card>
                  <CardHeader>
                    <CardTitle>Specialties</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {selectedShop.specialties.map((specialty, index) => (
                        <Badge key={index} variant="secondary">{specialty}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Services */}
                <Card>
                  <CardHeader>
                    <CardTitle>Available Services</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {selectedShop.services.map((service, index) => (
                        <Badge key={index} variant="outline">{service}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Operating Hours */}
                <Card>
                  <CardHeader>
                    <CardTitle>Operating Hours</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(selectedShop.operatingHours).map(([day, hours]) => (
                        <div key={day} className="flex justify-between">
                          <span className="font-medium">{day}:</span>
                          <span>{hours}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Certifications */}
                <Card>
                  <CardHeader>
                    <CardTitle>Certifications & Credentials</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {selectedShop.certification.map((cert, index) => (
                        <Badge key={index} variant="default" className="bg-blue-100 text-blue-800 hover:bg-blue-200">{cert}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Methods */}
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Methods</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {selectedShop.paymentMethods.map((method, index) => (
                        <Badge key={index} variant="outline">{method}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={() => handleCallShop(selectedShop.phone)}
                    className="flex items-center gap-2"
                  >
                    <Phone className="h-4 w-4" />
                    Call Shop
                  </Button>
                  {!selectedShop.mobileSevice && (
                    <Button
                      variant="outline"
                      onClick={() => handleGetDirections(selectedShop)}
                      className="flex items-center gap-2"
                    >
                      <Navigation className="h-4 w-4" />
                      Get Directions
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    onClick={() => handleScheduleService(selectedShop.id)}
                    className="flex items-center gap-2"
                  >
                    <Calendar className="h-4 w-4" />
                    Schedule Service
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleToggleFavorite(selectedShop.id)}
                    className="flex items-center gap-2"
                  >
                    {selectedShop.isFavorite ? (
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

export default RepairShopsPage;