/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { Search, MapPin, Calendar, DollarSign, Truck, Filter, BookOpen, Eye } from 'lucide-react';

const mockSearchResults = [
  {
    id: 'SL-001',
    shipper: 'TechCorp Industries',
    origin: 'Chicago, IL',
    destination: 'Houston, TX',
    pickupDate: '2024-06-20',
    deliveryDate: '2024-06-22',
    rate: '$2,750',
    distance: '1,087 mi',
    equipment: 'Dry Van',
    weight: '28,500 lbs',
    commodity: 'Electronics',
    status: 'available',
    postedTime: '2 hours ago'
  },
  {
    id: 'SL-002',
    shipper: 'Manufacturing Plus',
    origin: 'Detroit, MI',
    destination: 'Nashville, TN',
    pickupDate: '2024-06-21',
    deliveryDate: '2024-06-23',
    rate: '$1,950',
    distance: '465 mi',
    equipment: 'Flatbed',
    weight: '32,000 lbs',
    commodity: 'Machinery',
    status: 'available',
    postedTime: '4 hours ago'
  },
  {
    id: 'SL-003',
    shipper: 'Northwest Logistics',
    origin: 'Seattle, WA',
    destination: 'Portland, OR',
    pickupDate: '2024-06-21',
    deliveryDate: '2024-06-21',
    rate: '$1,200',
    distance: '173 mi',
    equipment: 'Reefer',
    weight: '25,000 lbs',
    commodity: 'Food Products',
    status: 'pending',
    postedTime: '6 hours ago'
  },
  {
    id: 'SL-004',
    shipper: 'Sunshine Freight',
    origin: 'Miami, FL',
    destination: 'Atlanta, GA',
    pickupDate: '2024-06-22',
    deliveryDate: '2024-06-23',
    rate: '$1,650',
    distance: '662 mi',
    equipment: 'Dry Van',
    weight: '30,000 lbs',
    commodity: 'Consumer Goods',
    status: 'available',
    postedTime: '1 day ago'
  }
];

interface SearchFilters {
  origin: string;
  destination: string;
  pickupDateFrom: string;
  pickupDateTo: string;
  equipment: string;
  rateMin: number[];
  distanceMax: number[];
  commodity: string;
}

export const SearchLoadsTab: React.FC = () => {
  const { toast } = useToast();
  const [searchResults, setSearchResults] = useState(mockSearchResults);
  const [isSearching, setIsSearching] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    origin: '',
    destination: '',
    pickupDateFrom: '',
    pickupDateTo: '',
    equipment: '',
    rateMin: [1000],
    distanceMax: [1000],
    commodity: ''
  });

  const handleSearch = async () => {
    setIsSearching(true);
    
    // Simulate AI search with delay
    setTimeout(() => {
      setSearchResults(mockSearchResults.filter(load => {
        if (filters.origin && !load.origin.toLowerCase().includes(filters.origin.toLowerCase())) {
          return false;
        }
        if (filters.destination && !load.destination.toLowerCase().includes(filters.destination.toLowerCase())) {
          return false;
        }
        if (filters.equipment && load.equipment !== filters.equipment) {
          return false;
        }
        return true;
      }));
      
      setIsSearching(false);
      toast({
        title: "🔍 Search Complete",
        description: `Found ${searchResults.length} loads matching your criteria.`,
      });
    }, 1500);
  };

  const handleBookLoad = (loadId: string) => {
    toast({
      title: "📋 Load Booked",
      description: `Load ${loadId} has been successfully booked.`,
    });
  };

  const handleViewDetails = (loadId: string) => {
    toast({
      title: "👁️ Load Details",
      description: `Opening detailed view for load ${loadId}.`,
    });
  };

  const handleSaveSearch = () => {
    toast({
      title: "💾 Search Saved",
      description: "Your search criteria has been saved for future use.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'booked': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Filters Card */}
      <Card className="shadow-lg border-border/60">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-blue-600" />
            AI-Powered Load Search
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Location Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="origin">Origin Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="origin"
                  placeholder="Enter pickup city, state, or ZIP"
                  value={filters.origin}
                  onChange={(e) => setFilters({ ...filters, origin: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="destination">Destination Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="destination"
                  placeholder="Enter delivery city, state, or ZIP"
                  value={filters.destination}
                  onChange={(e) => setFilters({ ...filters, destination: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          {/* Date Range Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pickup-from">Pickup Date From</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="pickup-from"
                  type="date"
                  value={filters.pickupDateFrom}
                  onChange={(e) => setFilters({ ...filters, pickupDateFrom: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="pickup-to">Pickup Date To</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="pickup-to"
                  type="date"
                  value={filters.pickupDateTo}
                  onChange={(e) => setFilters({ ...filters, pickupDateTo: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          {/* Equipment and Commodity Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="equipment">Equipment Type</Label>
              <Select value={filters.equipment} onValueChange={(value) => setFilters({ ...filters, equipment: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select equipment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dry-van">Dry Van</SelectItem>
                  <SelectItem value="reefer">Reefer</SelectItem>
                  <SelectItem value="flatbed">Flatbed</SelectItem>
                  <SelectItem value="step-deck">Step Deck</SelectItem>
                  <SelectItem value="lowboy">Lowboy</SelectItem>
                  <SelectItem value="tanker">Tanker</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="commodity">Commodity</Label>
              <Input
                id="commodity"
                placeholder="Enter commodity type"
                value={filters.commodity}
                onChange={(e) => setFilters({ ...filters, commodity: e.target.value })}
              />
            </div>
          </div>

          {/* Rate and Distance Sliders */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label>Minimum Rate: ${filters.rateMin[0]}</Label>
              <Slider
                value={filters.rateMin}
                onValueChange={(value) => setFilters({ ...filters, rateMin: value })}
                max={5000}
                min={500}
                step={100}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>$500</span>
                <span>$5,000</span>
              </div>
            </div>
            <div className="space-y-3">
              <Label>Maximum Distance: {filters.distanceMax[0]} mi</Label>
              <Slider
                value={filters.distanceMax}
                onValueChange={(value) => setFilters({ ...filters, distanceMax: value })}
                max={3000}
                min={50}
                step={50}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>50 mi</span>
                <span>3,000 mi</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Button 
              onClick={handleSearch} 
              disabled={isSearching}
              className="flex items-center gap-2"
            >
              <Search className="h-4 w-4" />
              {isSearching ? 'Searching...' : 'Search Loads'}
            </Button>
            <Button variant="outline" onClick={handleSaveSearch}>
              Save Search
            </Button>
            <Button variant="outline" onClick={() => setFilters({
              origin: '',
              destination: '',
              pickupDateFrom: '',
              pickupDateTo: '',
              equipment: '',
              rateMin: [1000],
              distanceMax: [1000],
              commodity: ''
            })}>
              <Filter className="h-4 w-4 mr-2" />
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      <Card className="shadow-lg border-border/60">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-blue-600" />
              Search Results ({searchResults.length} loads)
            </div>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              AI Enhanced
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isSearching ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center space-y-3">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="text-muted-foreground">AI is analyzing thousands of loads...</p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Load Details</TableHead>
                    <TableHead>Route</TableHead>
                    <TableHead>Schedule</TableHead>
                    <TableHead>Equipment</TableHead>
                    <TableHead>Rate & Distance</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {searchResults.map((load) => (
                    <TableRow key={load.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium text-sm">{load.shipper}</div>
                          <div className="text-sm text-blue-600">{load.commodity}</div>
                          <div className="text-xs text-muted-foreground">{load.id}</div>
                          <div className="text-xs text-muted-foreground">Posted {load.postedTime}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm">
                            <MapPin className="h-3 w-3 text-green-600" />
                            {load.origin}
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            <MapPin className="h-3 w-3 text-red-600" />
                            {load.destination}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {load.pickupDate}
                          </div>
                          <div className="text-muted-foreground">
                            Del: {load.deliveryDate}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1 text-sm">
                          <div className="font-medium">{load.equipment}</div>
                          <div className="text-muted-foreground">{load.weight}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium text-green-600">{load.rate}</div>
                          <div className="text-sm text-muted-foreground">{load.distance}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusColor(load.status)}>
                          {load.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewDetails(load.id)}
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleBookLoad(load.id)}
                            disabled={load.status !== 'available'}
                          >
                            <BookOpen className="h-3 w-3 mr-1" />
                            Book
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
