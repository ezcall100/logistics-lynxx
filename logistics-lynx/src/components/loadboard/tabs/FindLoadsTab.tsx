
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Search, Filter, DollarSign, Calendar, Package, Truck, Star, Eye } from 'lucide-react';

const mockLoads = [
  {
    id: 'LB-001',
    origin: 'Chicago, IL',
    destination: 'Houston, TX',
    pickupDate: '2024-06-20',
    deliveryDate: '2024-06-22',
    weight: '45,000 lbs',
    rate: '$2,750',
    mileage: '925 mi',
    trailerType: 'Dry Van',
    commodity: 'Electronics',
    rating: 4.8,
    priority: 'high'
  },
  {
    id: 'LB-002',
    origin: 'Los Angeles, CA',
    destination: 'Phoenix, AZ',
    pickupDate: '2024-06-21',
    deliveryDate: '2024-06-22',
    weight: '32,000 lbs',
    rate: '$1,850',
    mileage: '370 mi',
    trailerType: 'Reefer',
    commodity: 'Produce',
    rating: 4.9,
    priority: 'medium'
  },
  {
    id: 'LB-003',
    origin: 'Miami, FL',
    destination: 'Atlanta, GA',
    pickupDate: '2024-06-22',
    deliveryDate: '2024-06-23',
    weight: '38,500 lbs',
    rate: '$2,100',
    mileage: '650 mi',
    trailerType: 'Dry Van',
    commodity: 'Furniture',
    rating: 4.7,
    priority: 'low'
  },
  {
    id: 'LB-004',
    origin: 'Denver, CO',
    destination: 'Salt Lake City, UT',
    pickupDate: '2024-06-23',
    deliveryDate: '2024-06-24',
    weight: '41,200 lbs',
    rate: '$1,950',
    mileage: '525 mi',
    trailerType: 'Flatbed',
    commodity: 'Steel',
    rating: 4.6,
    priority: 'high'
  },
  {
    id: 'LB-005',
    origin: 'Seattle, WA',
    destination: 'Portland, OR',
    pickupDate: '2024-06-24',
    deliveryDate: '2024-06-24',
    weight: '28,000 lbs',
    rate: '$1,200',
    mileage: '175 mi',
    trailerType: 'Dry Van',
    commodity: 'Textiles',
    rating: 4.8,
    priority: 'medium'
  }
];

export const FindLoadsTab: React.FC = () => {
  const { toast } = useToast();
  const [searchFilters, setSearchFilters] = useState({
    origin: '',
    destination: '',
    radius: '100',
    trailerType: '',
    minRate: '',
    maxWeight: ''
  });

  const handleFilterChange = (field: string, value: string) => {
    setSearchFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleSearch = () => {
    toast({
      title: "🔍 Search Updated",
      description: "AI algorithms are finding the best loads matching your criteria.",
    });
  };

  const handleBookLoad = (loadId: string) => {
    toast({
      title: "✅ Load Booked",
      description: `Load ${loadId} has been successfully booked. Confirmation details sent.`,
    });
  };

  const handleViewDetails = (loadId: string) => {
    toast({
      title: "📋 Load Details",
      description: `Viewing detailed information for load ${loadId}.`,
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Filters */}
      <Card className="shadow-lg border-border/60">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-blue-600" />
            Smart Load Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Origin</label>
              <Input
                placeholder="City, State"
                value={searchFilters.origin}
                onChange={(e) => handleFilterChange('origin', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Destination</label>
              <Input
                placeholder="City, State"
                value={searchFilters.destination}
                onChange={(e) => handleFilterChange('destination', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Radius (mi)</label>
              <Select value={searchFilters.radius} onValueChange={(value) => handleFilterChange('radius', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="50">50 miles</SelectItem>
                  <SelectItem value="100">100 miles</SelectItem>
                  <SelectItem value="200">200 miles</SelectItem>
                  <SelectItem value="500">500 miles</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Trailer Type</label>
              <Select value={searchFilters.trailerType} onValueChange={(value) => handleFilterChange('trailerType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dry-van">Dry Van</SelectItem>
                  <SelectItem value="reefer">Reefer</SelectItem>
                  <SelectItem value="flatbed">Flatbed</SelectItem>
                  <SelectItem value="step-deck">Step Deck</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Min Rate ($)</label>
              <Input
                placeholder="1000"
                value={searchFilters.minRate}
                onChange={(e) => handleFilterChange('minRate', e.target.value)}
              />
            </div>
            <div className="space-y-2 flex flex-col justify-end">
              <Button onClick={handleSearch} className="w-full h-10 bg-gradient-to-r from-blue-600 to-indigo-600">
                <Search className="h-4 w-4 mr-2" />
                Search Loads
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Loads Table */}
      <Card className="shadow-lg border-border/60">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-emerald-600" />
              Available Loads
            </div>
            <Badge variant="secondary">{mockLoads.length} loads found</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Load ID</TableHead>
                  <TableHead>Route</TableHead>
                  <TableHead>Dates</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockLoads.map((load) => (
                  <TableRow key={load.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{load.id}</TableCell>
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
                        <div className="text-xs text-muted-foreground">{load.mileage}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {load.pickupDate}
                        </div>
                        <div className="text-muted-foreground">{load.deliveryDate}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-1">
                          <Truck className="h-3 w-3" />
                          {load.trailerType}
                        </div>
                        <div className="text-muted-foreground">{load.weight}</div>
                        <div className="text-xs text-blue-600">{load.commodity}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-green-600">{load.rate}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{load.rating}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getPriorityColor(load.priority)}>
                        {load.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewDetails(load.id)}
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-emerald-600 to-teal-600"
                          onClick={() => handleBookLoad(load.id)}
                        >
                          Book
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
