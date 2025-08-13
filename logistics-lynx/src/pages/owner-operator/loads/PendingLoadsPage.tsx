import React, { useState } from 'react';
import { Search, Filter, Eye, Truck, MapPin, DollarSign, Clock, Star, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface PendingLoad {
  id: string;
  loadNumber: string;
  shipper: string;
  origin: string;
  destination: string;
  pickupDate: string;
  deliveryDate: string;
  miles: number;
  rate: number;
  ratePerMile: number;
  weight: number;
  commodity: string;
  equipmentType: string;
  brokerRating: number;
  brokerName: string;
  requirements: string[];
  status: 'available' | 'bidding' | 'awarded';
  timePosted: string;
  deadhead: number;
  paymentTerms: string;
}

const PendingLoadsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [equipmentFilter, setEquipmentFilter] = useState('all');
  const [sortBy, setSortBy] = useState('rate');
  const [selectedLoad, setSelectedLoad] = useState<PendingLoad | null>(null);
  const [bidAmount, setBidAmount] = useState('');

  // Mock data for pending loads
  const pendingLoads: PendingLoad[] = [
    {
      id: 'PL001',
      loadNumber: 'TMS-2024-001',
      shipper: 'ABC Manufacturing',
      origin: 'Los Angeles, CA',
      destination: 'Phoenix, AZ',
      pickupDate: '2024-01-25',
      deliveryDate: '2024-01-26',
      miles: 385,
      rate: 1540,
      ratePerMile: 4.0,
      weight: 25000,
      commodity: 'Electronics',
      equipmentType: 'Dry Van',
      brokerRating: 4.8,
      brokerName: 'Freight Solutions LLC',
      requirements: ['TWIC Card', 'Hazmat Certified'],
      status: 'available',
      timePosted: '2 hours ago',
      deadhead: 45,
      paymentTerms: 'Quick Pay Available'
    },
    {
      id: 'PL002',
      loadNumber: 'TMS-2024-002',
      shipper: 'XYZ Logistics',
      origin: 'Dallas, TX',
      destination: 'Denver, CO',
      pickupDate: '2024-01-26',
      deliveryDate: '2024-01-27',
      miles: 645,
      rate: 2580,
      ratePerMile: 4.0,
      weight: 42000,
      commodity: 'Machinery',
      equipmentType: 'Flatbed',
      brokerRating: 4.6,
      brokerName: 'Premier Transport',
      requirements: ['Tarps', 'Straps'],
      status: 'bidding',
      timePosted: '4 hours ago',
      deadhead: 0,
      paymentTerms: 'NET 30'
    },
    {
      id: 'PL003',
      loadNumber: 'TMS-2024-003',
      shipper: 'Fresh Foods Corp',
      origin: 'Salinas, CA',
      destination: 'Las Vegas, NV',
      pickupDate: '2024-01-25',
      deliveryDate: '2024-01-25',
      miles: 420,
      rate: 1890,
      ratePerMile: 4.5,
      weight: 38000,
      commodity: 'Produce',
      equipmentType: 'Reefer',
      brokerRating: 4.9,
      brokerName: 'Cold Chain Solutions',
      requirements: ['Temperature Controlled', 'Food Grade'],
      status: 'available',
      timePosted: '1 hour ago',
      deadhead: 25,
      paymentTerms: 'Quick Pay Available'
    },
    {
      id: 'PL004',
      loadNumber: 'TMS-2024-004',
      shipper: 'Steel Works Inc',
      origin: 'Chicago, IL',
      destination: 'Detroit, MI',
      pickupDate: '2024-01-27',
      deliveryDate: '2024-01-27',
      miles: 280,
      rate: 1120,
      ratePerMile: 4.0,
      weight: 45000,
      commodity: 'Steel Coils',
      equipmentType: 'Flatbed',
      brokerRating: 4.3,
      brokerName: 'Heavy Haul Express',
      requirements: ['Chains', 'Permits'],
      status: 'available',
      timePosted: '30 minutes ago',
      deadhead: 80,
      paymentTerms: 'NET 15'
    },
    {
      id: 'PL005',
      loadNumber: 'TMS-2024-005',
      shipper: 'Auto Parts Direct',
      origin: 'Atlanta, GA',
      destination: 'Charlotte, NC',
      pickupDate: '2024-01-26',
      deliveryDate: '2024-01-26',
      miles: 245,
      rate: 980,
      ratePerMile: 4.0,
      weight: 18000,
      commodity: 'Auto Parts',
      equipmentType: 'Dry Van',
      brokerRating: 4.7,
      brokerName: 'Southeast Freight',
      requirements: ['Liftgate'],
      status: 'awarded',
      timePosted: '6 hours ago',
      deadhead: 15,
      paymentTerms: 'Quick Pay Available'
    }
  ];

  const filteredLoads = pendingLoads.filter(load => {
    const matchesSearch = load.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         load.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         load.commodity.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEquipment = equipmentFilter === 'all' || load.equipmentType === equipmentFilter;
    return matchesSearch && matchesEquipment;
  });

  const sortedLoads = [...filteredLoads].sort((a, b) => {
    switch (sortBy) {
      case 'rate':
        return b.rate - a.rate;
      case 'ratePerMile':
        return b.ratePerMile - a.ratePerMile;
      case 'miles':
        return a.miles - b.miles;
      case 'pickupDate':
        return new Date(a.pickupDate).getTime() - new Date(b.pickupDate).getTime();
      default:
        return 0;
    }
  });

  const handleAcceptLoad = (load: PendingLoad) => {
    toast.success(`Load ${load.loadNumber} accepted successfully!`);
    // Mock API call would go here
  };

  const handleBidOnLoad = (load: PendingLoad) => {
    if (!bidAmount) {
      toast.error('Please enter a bid amount');
      return;
    }
    toast.success(`Bid of $${bidAmount} submitted for load ${load.loadNumber}`);
    setBidAmount('');
    setSelectedLoad(null);
    // Mock API call would go here
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Available</Badge>;
      case 'bidding':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Bidding</Badge>;
      case 'awarded':
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Awarded</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star
        key={i}
        size={14}
        className={i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
      />
    ));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getTotalEarnings = () => {
    return sortedLoads.filter(load => load.status === 'available').reduce((sum, load) => sum + load.rate, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Pending Loads</h1>
            <p className="text-muted-foreground">Find and book available loads for transport</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" className="hover-scale">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filter
            </Button>
            <Button className="bg-primary hover:bg-primary/90">
              <Eye className="h-4 w-4 mr-2" />
              Load Board
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Loads</CardTitle>
              <Truck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{sortedLoads.filter(load => load.status === 'available').length}</div>
              <p className="text-xs text-muted-foreground">+2 from yesterday</p>
            </CardContent>
          </Card>

          <Card className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Potential</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(getTotalEarnings())}</div>
              <p className="text-xs text-muted-foreground">Available earnings</p>
            </CardContent>
          </Card>

          <Card className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Rate/Mile</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${(sortedLoads.reduce((sum, load) => sum + load.ratePerMile, 0) / sortedLoads.length).toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">Current market rate</p>
            </CardContent>
          </Card>

          <Card className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Quick Loads</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {sortedLoads.filter(load => load.paymentTerms.includes('Quick')).length}
              </div>
              <p className="text-xs text-muted-foreground">Quick pay available</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by origin, destination, or commodity..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={equipmentFilter} onValueChange={setEquipmentFilter}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Equipment Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Equipment</SelectItem>
                  <SelectItem value="Dry Van">Dry Van</SelectItem>
                  <SelectItem value="Reefer">Reefer</SelectItem>
                  <SelectItem value="Flatbed">Flatbed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rate">Highest Rate</SelectItem>
                  <SelectItem value="ratePerMile">Rate per Mile</SelectItem>
                  <SelectItem value="miles">Shortest Distance</SelectItem>
                  <SelectItem value="pickupDate">Pickup Date</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Loads Table */}
        <Card>
          <CardHeader>
            <CardTitle>Available Loads ({sortedLoads.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Load #</TableHead>
                    <TableHead>Route</TableHead>
                    <TableHead>Pickup/Delivery</TableHead>
                    <TableHead>Equipment</TableHead>
                    <TableHead>Distance</TableHead>
                    <TableHead>Rate</TableHead>
                    <TableHead>Rate/Mile</TableHead>
                    <TableHead>Broker</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedLoads.map((load) => (
                    <TableRow key={load.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">{load.loadNumber}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm font-medium">{load.origin}</div>
                          <div className="text-xs text-muted-foreground">to {load.destination}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm">{new Date(load.pickupDate).toLocaleDateString()}</div>
                          <div className="text-xs text-muted-foreground">{new Date(load.deliveryDate).toLocaleDateString()}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{load.equipmentType}</Badge>
                      </TableCell>
                      <TableCell>{load.miles} mi</TableCell>
                      <TableCell className="font-semibold text-green-600">{formatCurrency(load.rate)}</TableCell>
                      <TableCell>${load.ratePerMile}/mi</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm font-medium">{load.brokerName}</div>
                          <div className="flex items-center gap-1">
                            {renderStars(load.brokerRating)}
                            <span className="text-xs text-muted-foreground ml-1">{load.brokerRating}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(load.status)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => setSelectedLoad(load)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Load Details - {load.loadNumber}</DialogTitle>
                                <DialogDescription>Complete load information and requirements</DialogDescription>
                              </DialogHeader>
                              {selectedLoad && (
                                <Tabs defaultValue="details" className="w-full">
                                  <TabsList className="grid w-full grid-cols-3">
                                    <TabsTrigger value="details">Details</TabsTrigger>
                                    <TabsTrigger value="requirements">Requirements</TabsTrigger>
                                    <TabsTrigger value="broker">Broker Info</TabsTrigger>
                                  </TabsList>
                                  
                                  <TabsContent value="details" className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <label className="text-sm font-medium">Shipper</label>
                                        <p className="text-sm text-muted-foreground">{selectedLoad.shipper}</p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium">Commodity</label>
                                        <p className="text-sm text-muted-foreground">{selectedLoad.commodity}</p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium">Weight</label>
                                        <p className="text-sm text-muted-foreground">{selectedLoad.weight.toLocaleString()} lbs</p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium">Deadhead</label>
                                        <p className="text-sm text-muted-foreground">{selectedLoad.deadhead} miles</p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium">Payment Terms</label>
                                        <p className="text-sm text-muted-foreground">{selectedLoad.paymentTerms}</p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium">Posted</label>
                                        <p className="text-sm text-muted-foreground">{selectedLoad.timePosted}</p>
                                      </div>
                                    </div>
                                  </TabsContent>

                                  <TabsContent value="requirements" className="space-y-4">
                                    <div>
                                      <label className="text-sm font-medium">Special Requirements</label>
                                      <div className="flex flex-wrap gap-2 mt-2">
                                        {selectedLoad.requirements.map((req, index) => (
                                          <Badge key={index} variant="outline">{req}</Badge>
                                        ))}
                                      </div>
                                    </div>
                                  </TabsContent>

                                  <TabsContent value="broker" className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <label className="text-sm font-medium">Broker Name</label>
                                        <p className="text-sm text-muted-foreground">{selectedLoad.brokerName}</p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium">Rating</label>
                                        <div className="flex items-center gap-1 mt-1">
                                          {renderStars(selectedLoad.brokerRating)}
                                          <span className="text-sm text-muted-foreground ml-1">{selectedLoad.brokerRating}/5</span>
                                        </div>
                                      </div>
                                    </div>
                                  </TabsContent>
                                </Tabs>
                              )}
                              
                              <div className="flex justify-end gap-3 pt-4 border-t">
                                {load.status === 'available' ? (
                                  <Button onClick={() => handleAcceptLoad(load)} className="bg-green-600 hover:bg-green-700">
                                    Accept Load
                                  </Button>
                                ) : load.status === 'bidding' ? (
                                  <div className="flex gap-2">
                                    <Input
                                      placeholder="Enter bid amount"
                                      value={bidAmount}
                                      onChange={(e) => setBidAmount(e.target.value)}
                                      className="w-40"
                                    />
                                    <Button onClick={() => handleBidOnLoad(load)}>
                                      Submit Bid
                                    </Button>
                                  </div>
                                ) : (
                                  <Badge variant="outline" className="px-4 py-2">Load Already Awarded</Badge>
                                )}
                              </div>
                            </DialogContent>
                          </Dialog>
                          
                          {load.status === 'available' && (
                            <Button 
                              size="sm" 
                              onClick={() => handleAcceptLoad(load)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              Accept
                            </Button>
                          )}
                          {load.status === 'bidding' && (
                            <Button size="sm" variant="outline">
                              Bid
                            </Button>
                          )}
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
    </div>
  );
};

export default PendingLoadsPage;