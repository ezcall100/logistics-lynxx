import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Package, 
  MapPin, 
  Clock, 
  Truck, 
  CheckCircle2,
  AlertTriangle,
  Search,
  Filter,
  Eye,
  Star,
  TrendingUp,
  DollarSign,
  Calendar,
  Download,
  FileText,
  BarChart3
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadHistory {
  id: string;
  loadNumber: string;
  customerName: string;
  pickupLocation: string;
  deliveryLocation: string;
  pickupDate: string;
  deliveryDate: string;
  completedDate: string;
  weight: number;
  rate: number;
  status: 'completed' | 'cancelled' | 'damaged' | 'delayed-completed';
  commodity: string;
  distance: number;
  fuelCost: number;
  tollCost: number;
  rating: number;
  deliveryTime: string;
  notes?: string;
  customerContact: {
    name: string;
    phone: string;
    email: string;
  };
  specialInstructions?: string;
  delays?: number; // minutes delayed
}

const LoadHistoryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('30');
  const [customerFilter, setCustomerFilter] = useState('all');
  const [selectedLoad, setSelectedLoad] = useState<LoadHistory | null>(null);

  const loadHistory: LoadHistory[] = [
    {
      id: "1",
      loadNumber: "LD-789456",
      customerName: "ABC Manufacturing",
      pickupLocation: "Dallas, TX",
      deliveryLocation: "Oklahoma City, OK",
      pickupDate: "2025-01-19 08:00",
      deliveryDate: "2025-01-19 14:30",
      completedDate: "2025-01-19 14:15",
      weight: 45000,
      rate: 2850.00,
      status: "completed",
      commodity: "Steel Components",
      distance: 205,
      fuelCost: 156.75,
      tollCost: 25.00,
      rating: 4.8,
      deliveryTime: "6h 15m",
      notes: "Smooth delivery, customer was very satisfied",
      customerContact: {
        name: "Sarah Johnson",
        phone: "(405) 555-0123",
        email: "sarah.johnson@abcmfg.com"
      },
      specialInstructions: "Dock #3, bring BOL. Fragile - Handle with care."
    },
    {
      id: "2",
      loadNumber: "LD-456123",
      customerName: "Food Processing Inc",
      pickupLocation: "San Antonio, TX",
      deliveryLocation: "Phoenix, AZ",
      pickupDate: "2025-01-15 10:00",
      deliveryDate: "2025-01-16 20:00",
      completedDate: "2025-01-16 20:30",
      weight: 42000,
      rate: 2950.00,
      status: "delayed-completed",
      commodity: "Frozen Foods",
      distance: 856,
      fuelCost: 324.50,
      tollCost: 15.00,
      rating: 4.2,
      deliveryTime: "34h 30m",
      delays: 30,
      notes: "Completed with minor delay due to traffic",
      customerContact: {
        name: "Lisa Chen",
        phone: "(602) 555-0287",
        email: "lisa.chen@foodproc.com"
      },
      specialInstructions: "Reefer load. Maintain -10°F. Time-sensitive delivery."
    },
    {
      id: "3",
      loadNumber: "LD-123789",
      customerName: "Retail Distribution Center",
      pickupLocation: "Houston, TX",
      deliveryLocation: "Denver, CO",
      pickupDate: "2025-01-10 06:00",
      deliveryDate: "2025-01-12 18:00",
      completedDate: "2025-01-12 17:45",
      weight: 38500,
      rate: 3200.00,
      status: "completed",
      commodity: "Consumer Electronics",
      distance: 925,
      fuelCost: 387.25,
      tollCost: 45.00,
      rating: 5.0,
      deliveryTime: "59h 45m",
      notes: "Perfect delivery, bonus earned for early completion",
      customerContact: {
        name: "Mike Rodriguez",
        phone: "(303) 555-0198",
        email: "mike.rodriguez@retaildc.com"
      },
      specialInstructions: "Temperature controlled required. Signature required for delivery."
    },
    {
      id: "4",
      loadNumber: "LD-789012",
      customerName: "Construction Materials LLC",
      pickupLocation: "Austin, TX",
      deliveryLocation: "Las Vegas, NV",
      pickupDate: "2025-01-05 07:00",
      deliveryDate: "2025-01-07 16:00",
      completedDate: "2025-01-07 16:00",
      weight: 49500,
      rate: 3100.00,
      status: "completed",
      commodity: "Building Materials",
      distance: 1089,
      fuelCost: 445.75,
      tollCost: 35.00,
      rating: 4.6,
      deliveryTime: "57h 00m",
      notes: "Standard delivery completed on time",
      customerContact: {
        name: "David Wang",
        phone: "(702) 555-0341",
        email: "david.wang@constructmat.com"
      },
      specialInstructions: "Oversized load permit required. Escort vehicle needed."
    },
    {
      id: "5",
      loadNumber: "LD-345678",
      customerName: "Tech Solutions Corp",
      pickupLocation: "Fort Worth, TX",
      deliveryLocation: "Seattle, WA",
      pickupDate: "2024-12-28 05:00",
      deliveryDate: "2025-01-01 15:00",
      completedDate: "2025-01-01 14:30",
      weight: 25000,
      rate: 4200.00,
      status: "completed",
      commodity: "Computer Equipment",
      distance: 2050,
      fuelCost: 825.00,
      tollCost: 125.00,
      rating: 4.9,
      deliveryTime: "85h 30m",
      notes: "Long haul completed successfully with high customer satisfaction",
      customerContact: {
        name: "Jennifer Martinez",
        phone: "(206) 555-0456",
        email: "jennifer.martinez@techsolutions.com"
      },
      specialInstructions: "High-value cargo. Additional security required."
    },
    {
      id: "6",
      loadNumber: "LD-567890",
      customerName: "Agricultural Products Co",
      pickupLocation: "Dallas, TX",
      deliveryLocation: "Kansas City, MO",
      pickupDate: "2024-12-20 08:00",
      deliveryDate: "2024-12-21 16:00",
      completedDate: "2024-12-21 18:30",
      weight: 47000,
      rate: 1850.00,
      status: "delayed-completed",
      commodity: "Agricultural Equipment",
      distance: 650,
      fuelCost: 245.50,
      tollCost: 20.00,
      rating: 3.8,
      deliveryTime: "34h 30m",
      delays: 150,
      notes: "Delivery completed with significant delay due to weather",
      customerContact: {
        name: "Robert Kim",
        phone: "(816) 555-0234",
        email: "robert.kim@agriproducts.com"
      },
      specialInstructions: "Weather-sensitive cargo. Handle with extra care."
    },
    {
      id: "7",
      loadNumber: "LD-234567",
      customerName: "Fashion Retail Group",
      pickupLocation: "El Paso, TX",
      deliveryLocation: "Los Angeles, CA",
      pickupDate: "2024-12-15 09:00",
      deliveryDate: "2024-12-16 14:00",
      completedDate: "2024-12-16 14:00",
      weight: 32000,
      rate: 2400.00,
      status: "completed",
      commodity: "Clothing & Textiles",
      distance: 785,
      fuelCost: 298.75,
      tollCost: 40.00,
      rating: 4.5,
      deliveryTime: "29h 00m",
      notes: "Standard delivery completed exactly on schedule",
      customerContact: {
        name: "Amanda Foster",
        phone: "(213) 555-0567",
        email: "amanda.foster@fashionretail.com"
      },
      specialInstructions: "Fragile items. No stacking above marked level."
    },
    {
      id: "8",
      loadNumber: "LD-890123",
      customerName: "Medical Supplies Inc",
      pickupLocation: "San Antonio, TX",
      deliveryLocation: "Chicago, IL",
      pickupDate: "2024-12-10 06:00",
      deliveryDate: "2024-12-12 20:00",
      completedDate: "2024-12-12 19:45",
      weight: 28500,
      rate: 3750.00,
      status: "completed",
      commodity: "Medical Equipment",
      distance: 1150,
      fuelCost: 465.00,
      tollCost: 85.00,
      rating: 5.0,
      deliveryTime: "61h 45m",
      notes: "Critical delivery completed early with perfect condition",
      customerContact: {
        name: "Dr. Sarah Williams",
        phone: "(312) 555-0789",
        email: "sarah.williams@medsupplies.com"
      },
      specialInstructions: "Time-critical medical equipment. White glove service required."
    },
    {
      id: "9",
      loadNumber: "LD-456789",
      customerName: "Automotive Parts Dist",
      pickupLocation: "Houston, TX",
      deliveryLocation: "Atlanta, GA",
      pickupDate: "2024-12-05 10:00",
      deliveryDate: "2024-12-07 18:00",
      completedDate: "2024-12-07 18:00",
      weight: 44000,
      rate: 2650.00,
      status: "completed",
      commodity: "Auto Parts",
      distance: 925,
      fuelCost: 356.25,
      tollCost: 55.00,
      rating: 4.3,
      deliveryTime: "56h 00m",
      notes: "Delivery completed on time with good customer feedback",
      customerContact: {
        name: "Michael Thompson",
        phone: "(404) 555-0345",
        email: "michael.thompson@autoparts.com"
      },
      specialInstructions: "Automotive parts - handle carefully to avoid damage."
    },
    {
      id: "10",
      loadNumber: "LD-678901",
      customerName: "Food & Beverage Co",
      pickupLocation: "Austin, TX",
      deliveryLocation: "Memphis, TN",
      pickupDate: "2024-12-01 07:00",
      deliveryDate: "2024-12-02 19:00",
      completedDate: "2024-12-02 19:00",
      weight: 41500,
      rate: 2150.00,
      status: "completed",
      commodity: "Beverages",
      distance: 745,
      fuelCost: 287.50,
      tollCost: 30.00,
      rating: 4.7,
      deliveryTime: "36h 00m",
      notes: "Smooth delivery with excellent customer service feedback",
      customerContact: {
        name: "Jessica Davis",
        phone: "(901) 555-0456",
        email: "jessica.davis@foodbev.com"
      },
      specialInstructions: "Temperature-sensitive beverages. Keep cool during transport."
    }
  ];

  const filteredLoads = loadHistory.filter(load => {
    const matchesSearch = load.loadNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         load.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         load.commodity.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         load.pickupLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         load.deliveryLocation.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || load.status === statusFilter;
    const matchesCustomer = customerFilter === 'all' || load.customerName === customerFilter;
    
    const now = new Date();
    const loadDate = new Date(load.completedDate);
    const daysAgo = parseInt(dateFilter);
    const cutoffDate = new Date(now.getTime() - (daysAgo * 24 * 60 * 60 * 1000));
    const matchesDate = loadDate >= cutoffDate;
    
    return matchesSearch && matchesStatus && matchesCustomer && matchesDate;
  });

  const getStatusBadge = (status: string) => {
    const variants = {
      'completed': 'bg-green-100 text-green-700 border-green-200',
      'cancelled': 'bg-red-100 text-red-700 border-red-200',
      'damaged': 'bg-orange-100 text-orange-700 border-orange-200',
      'delayed-completed': 'bg-yellow-100 text-yellow-700 border-yellow-200'
    };
    
    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {status.replace('-', ' ').toUpperCase()}
      </Badge>
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatWeight = (weight: number) => {
    return `${weight.toLocaleString()} lbs`;
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={cn(
          "w-4 h-4",
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        )}
      />
    ));
  };

  const handleExportData = () => {
    try {
      // Create CSV headers
      const headers = [
        'Load Number',
        'Customer',
        'Pickup Location',
        'Delivery Location',
        'Pickup Date',
        'Delivery Date',
        'Completed Date',
        'Weight',
        'Rate',
        'Status',
        'Commodity',
        'Distance',
        'Fuel Cost',
        'Toll Cost',
        'Rating',
        'Delivery Time'
      ];

      // Convert data to CSV format
      const csvData = [
        headers.join(','),
        ...filteredLoads.map(load => [
          load.loadNumber,
          `"${load.customerName}"`,
          `"${load.pickupLocation}"`,
          `"${load.deliveryLocation}"`,
          load.pickupDate,
          load.deliveryDate,
          load.completedDate,
          load.weight,
          load.rate,
          load.status,
          `"${load.commodity}"`,
          load.distance,
          load.fuelCost,
          load.tollCost,
          load.rating,
          load.deliveryTime
        ].join(','))
      ].join('\n');

      // Create and download file
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `load_history_${new Date().toISOString().slice(0, 10)}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      console.log('Load history data exported successfully');
    } catch (error) {
      console.error('Error exporting data:', error);
    }
  };

  // Statistics
  const totalLoads = filteredLoads.length;
  const totalRevenue = filteredLoads.reduce((sum, load) => sum + load.rate, 0);
  const totalMiles = filteredLoads.reduce((sum, load) => sum + load.distance, 0);
  const totalFuelCosts = filteredLoads.reduce((sum, load) => sum + load.fuelCost, 0);
  const completedLoads = filteredLoads.filter(load => load.status === 'completed').length;
  const averageRating = filteredLoads.filter(load => load.rating > 0)
    .reduce((sum, load, _, arr) => sum + load.rating / arr.length, 0);
  const onTimeDeliveries = filteredLoads.filter(load => !load.delays || load.delays <= 15).length;
  const onTimePercentage = totalLoads > 0 ? (onTimeDeliveries / totalLoads) * 100 : 0;

  // Get unique customers for filter
  const uniqueCustomers = Array.from(new Set(loadHistory.map(load => load.customerName))).sort();

  return (
    <div className="w-full max-w-none p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            Load History
          </h1>
          <p className="text-muted-foreground mt-1">
            Review your completed loads and performance metrics
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleExportData}>
            <Download className="w-4 h-4 mr-2" />
            Export History
          </Button>
          <Button className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600">
            <BarChart3 className="w-4 h-4 mr-2" />
            View Analytics
          </Button>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass-subtle border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(totalRevenue)}</p>
                <p className="text-xs text-muted-foreground">From {totalLoads} loads</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-subtle border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Miles</p>
                <p className="text-2xl font-bold text-blue-600">{totalMiles.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Avg: {Math.round(totalMiles / totalLoads)} per load</p>
              </div>
              <Truck className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-subtle border-l-4 border-l-yellow-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Average Rating</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold text-yellow-600">
                    {averageRating.toFixed(1)}
                  </p>
                  <div className="flex">
                    {renderStars(Math.round(averageRating))}
                  </div>
                </div>
              </div>
              <Star className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-subtle border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">On-Time Delivery</p>
                <p className="text-2xl font-bold text-purple-600">{onTimePercentage.toFixed(1)}%</p>
                <p className="text-xs text-muted-foreground">{onTimeDeliveries} of {totalLoads} loads</p>
              </div>
              <CheckCircle2 className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glass-subtle">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Fuel Costs</p>
                <p className="text-xl font-bold">{formatCurrency(totalFuelCosts)}</p>
                <p className="text-xs text-muted-foreground">
                  {((totalFuelCosts / totalRevenue) * 100).toFixed(1)}% of revenue
                </p>
              </div>
              <TrendingUp className="w-6 h-6 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-subtle">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed Loads</p>
                <p className="text-xl font-bold text-green-600">{completedLoads}</p>
                <p className="text-xs text-muted-foreground">
                  {((completedLoads / totalLoads) * 100).toFixed(1)}% completion rate
                </p>
              </div>
              <Package className="w-6 h-6 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-subtle">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Rate per Mile</p>
                <p className="text-xl font-bold text-blue-600">
                  {formatCurrency(totalRevenue / totalMiles)}
                </p>
                <p className="text-xs text-muted-foreground">Revenue efficiency</p>
              </div>
              <BarChart3 className="w-6 h-6 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="glass-subtle">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search by load number, customer, commodity, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full lg:w-48 bg-background z-50">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="z-50 bg-background border shadow-lg">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="delayed-completed">Delayed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="damaged">Damaged</SelectItem>
              </SelectContent>
            </Select>
            <Select value={customerFilter} onValueChange={setCustomerFilter}>
              <SelectTrigger className="w-full lg:w-64 bg-background z-50">
                <SelectValue placeholder="Filter by customer" />
              </SelectTrigger>
              <SelectContent className="z-50 bg-background border shadow-lg">
                <SelectItem value="all">All Customers</SelectItem>
                {uniqueCustomers.map(customer => (
                  <SelectItem key={customer} value={customer}>{customer}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-full lg:w-48 bg-background z-50">
                <SelectValue placeholder="Filter by date" />
              </SelectTrigger>
              <SelectContent className="z-50 bg-background border shadow-lg">
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
                <SelectItem value="180">Last 6 months</SelectItem>
                <SelectItem value="365">Last year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Load History Table */}
      <Card className="glass-subtle">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5 text-red-500" />
            Load History ({filteredLoads.length} loads)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Load #</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Route</TableHead>
                  <TableHead>Completed</TableHead>
                  <TableHead>Weight</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead>Miles</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLoads.map((load) => (
                  <TableRow key={load.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{load.loadNumber}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium">{load.customerName}</div>
                        <div className="text-muted-foreground">{load.commodity}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-green-500" />
                          {load.pickupLocation}
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <MapPin className="w-3 h-3 text-red-500" />
                          {load.deliveryLocation}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(load.completedDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {load.deliveryTime}
                        </div>
                        {load.delays && load.delays > 15 && (
                          <div className="flex items-center gap-1 text-red-600">
                            <AlertTriangle className="w-3 h-3" />
                            {Math.round(load.delays / 60)}h {load.delays % 60}m delay
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{formatWeight(load.weight)}</TableCell>
                    <TableCell className="font-medium text-green-600">
                      {formatCurrency(load.rate)}
                    </TableCell>
                    <TableCell>{load.distance.toLocaleString()}</TableCell>
                    <TableCell>
                      {getStatusBadge(load.status)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {load.rating > 0 ? (
                          <>
                            <span className="text-sm font-medium">{load.rating}</span>
                            <div className="flex">
                              {renderStars(load.rating)}
                            </div>
                          </>
                        ) : (
                          <span className="text-muted-foreground text-sm">N/A</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedLoad(load)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Load Details - {load.loadNumber}</DialogTitle>
                            <DialogDescription>
                              View comprehensive details for this load including route information, cargo details, and performance metrics.
                            </DialogDescription>
                          </DialogHeader>
                          {selectedLoad && (
                            <div className="space-y-6">
                              {/* Load Information */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg">Load Information</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-3">
                                    <div>
                                      <label className="text-sm font-medium text-muted-foreground">Load Number</label>
                                      <p className="text-lg font-semibold">{selectedLoad.loadNumber}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-muted-foreground">Customer</label>
                                      <p className="text-lg">{selectedLoad.customerName}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-muted-foreground">Commodity</label>
                                      <p className="text-lg">{selectedLoad.commodity}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-muted-foreground">Weight</label>
                                      <p className="text-lg">{formatWeight(selectedLoad.weight)}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-muted-foreground">Distance</label>
                                      <p className="text-lg">{selectedLoad.distance} miles</p>
                                    </div>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg">Financial Details</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-3">
                                    <div>
                                      <label className="text-sm font-medium text-muted-foreground">Rate</label>
                                      <p className="text-lg font-semibold text-green-600">{formatCurrency(selectedLoad.rate)}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-muted-foreground">Fuel Cost</label>
                                      <p className="text-lg">{formatCurrency(selectedLoad.fuelCost)}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-muted-foreground">Toll Cost</label>
                                      <p className="text-lg">{formatCurrency(selectedLoad.tollCost)}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-muted-foreground">Net Profit</label>
                                      <p className="text-lg font-semibold text-green-600">
                                        {formatCurrency(selectedLoad.rate - selectedLoad.fuelCost - selectedLoad.tollCost)}
                                      </p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-muted-foreground">Rate per Mile</label>
                                      <p className="text-lg">{formatCurrency(selectedLoad.rate / selectedLoad.distance)}</p>
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>

                              {/* Timeline & Performance */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg">Timeline</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-3">
                                    <div>
                                      <label className="text-sm font-medium text-muted-foreground">Pickup Date</label>
                                      <p className="text-lg">{new Date(selectedLoad.pickupDate).toLocaleString()}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-muted-foreground">Delivery Date</label>
                                      <p className="text-lg">{new Date(selectedLoad.deliveryDate).toLocaleString()}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-muted-foreground">Completed Date</label>
                                      <p className="text-lg">{new Date(selectedLoad.completedDate).toLocaleString()}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-muted-foreground">Total Time</label>
                                      <p className="text-lg">{selectedLoad.deliveryTime}</p>
                                    </div>
                                    {selectedLoad.delays && selectedLoad.delays > 0 && (
                                      <div>
                                        <label className="text-sm font-medium text-muted-foreground">Delay</label>
                                        <p className="text-lg text-red-600">
                                          {Math.floor(selectedLoad.delays / 60)}h {selectedLoad.delays % 60}m
                                        </p>
                                      </div>
                                    )}
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg">Performance</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-3">
                                    <div>
                                      <label className="text-sm font-medium text-muted-foreground">Status</label>
                                      <div className="mt-1">
                                        {getStatusBadge(selectedLoad.status)}
                                      </div>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-muted-foreground">Customer Rating</label>
                                      <div className="flex items-center gap-2 mt-1">
                                        <span className="text-lg font-medium">{selectedLoad.rating}</span>
                                        <div className="flex">
                                          {renderStars(selectedLoad.rating)}
                                        </div>
                                      </div>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-muted-foreground">On-Time Performance</label>
                                      <p className="text-lg">
                                        {(!selectedLoad.delays || selectedLoad.delays <= 15) ? (
                                          <span className="text-green-600 font-medium">On Time</span>
                                        ) : (
                                          <span className="text-red-600 font-medium">Delayed</span>
                                        )}
                                      </p>
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>

                              {/* Route Information */}
                              <Card>
                                <CardHeader>
                                  <CardTitle className="text-lg">Route Information</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                      <h4 className="font-semibold text-green-600 mb-2">Pickup Location</h4>
                                      <p className="text-lg">{selectedLoad.pickupLocation}</p>
                                    </div>
                                    <div>
                                      <h4 className="font-semibold text-red-600 mb-2">Delivery Location</h4>
                                      <p className="text-lg">{selectedLoad.deliveryLocation}</p>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>

                              {/* Customer Contact */}
                              <Card>
                                <CardHeader>
                                  <CardTitle className="text-lg">Customer Contact</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                      <label className="text-sm font-medium text-muted-foreground">Contact Name</label>
                                      <p className="text-lg">{selectedLoad.customerContact.name}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-muted-foreground">Phone</label>
                                      <p className="text-lg">{selectedLoad.customerContact.phone}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-muted-foreground">Email</label>
                                      <p className="text-lg">{selectedLoad.customerContact.email}</p>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>

                              {/* Special Instructions */}
                              {selectedLoad.specialInstructions && (
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg">Special Instructions</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                                      <p className="text-sm">{selectedLoad.specialInstructions}</p>
                                    </div>
                                  </CardContent>
                                </Card>
                              )}

                              {/* Notes */}
                              {selectedLoad.notes && (
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg">Delivery Notes</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <p className="text-sm p-3 bg-muted rounded-lg">
                                      {selectedLoad.notes}
                                    </p>
                                  </CardContent>
                                </Card>
                              )}
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {filteredLoads.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium">No load history found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LoadHistoryPage;