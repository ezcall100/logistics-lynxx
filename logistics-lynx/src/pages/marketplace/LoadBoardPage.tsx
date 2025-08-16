/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  DollarSign, 
  Truck,
  Package,
  Star,
  Heart,
  RefreshCw,
  ArrowUpDown,
  Calendar,
  Weight,
  Ruler,
  Thermometer,
  Shield,
  AlertTriangle,
  CheckCircle,
  Eye,
  MessageSquare,
  Phone
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { toast } from 'sonner';

const LoadBoardPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEquipment, setSelectedEquipment] = useState('all');
  const [selectedDistance, setSelectedDistance] = useState('all');
  const [sortBy, setSortBy] = useState('rate');
  const [showFavorites, setShowFavorites] = useState(false);
  const [selectedLoad, setSelectedLoad] = useState<unknown>(null);
  const [bidAmount, setBidAmount] = useState('');
  const [bidComments, setBidComments] = useState('');

  // Sample load data
  const loads = [
    {
      id: 'LD001',
      origin: { city: 'Los Angeles', state: 'CA', zip: '90210' },
      destination: { city: 'Dallas', state: 'TX', zip: '75201' },
      distance: 1435,
      rate: 4250,
      ratePerMile: 2.96,
      equipment: 'Van',
      weight: 42000,
      length: 48,
      pickupDate: '2024-01-15',
      deliveryDate: '2024-01-17',
      commodity: 'Electronics',
      broker: 'FreightMax LLC',
      brokerRating: 4.8,
      loadType: 'Full Truckload',
      specialRequirements: ['Temperature Controlled', 'Expedited'],
      isFavorite: false,
      status: 'Available',
      timePosted: '2 hours ago',
      bidsCount: 8,
      isHot: true,
      priority: 'high'
    },
    {
      id: 'LD002',
      origin: { city: 'Chicago', state: 'IL', zip: '60601' },
      destination: { city: 'Atlanta', state: 'GA', zip: '30301' },
      distance: 715,
      rate: 2150,
      ratePerMile: 3.01,
      equipment: 'Flatbed',
      weight: 38500,
      length: 53,
      pickupDate: '2024-01-16',
      deliveryDate: '2024-01-18',
      commodity: 'Steel Coils',
      broker: 'Logistics Pro',
      brokerRating: 4.6,
      loadType: 'Full Truckload',
      specialRequirements: ['Tarps Required', 'Chains Required'],
      isFavorite: true,
      status: 'Available',
      timePosted: '4 hours ago',
      bidsCount: 12,
      isHot: true,
      priority: 'high'
    },
    {
      id: 'LD003',
      origin: { city: 'Miami', state: 'FL', zip: '33101' },
      destination: { city: 'New York', state: 'NY', zip: '10001' },
      distance: 1280,
      rate: 3200,
      ratePerMile: 2.50,
      equipment: 'Reefer',
      weight: 40000,
      length: 53,
      pickupDate: '2024-01-17',
      deliveryDate: '2024-01-19',
      commodity: 'Frozen Foods',
      broker: 'Cold Chain Solutions',
      brokerRating: 4.9,
      loadType: 'Full Truckload',
      specialRequirements: ['Temperature: -10°F', 'Food Grade'],
      isFavorite: false,
      status: 'Available',
      timePosted: '1 hour ago',
      bidsCount: 5,
      isHot: false,
      priority: 'medium'
    },
    {
      id: 'LD004',
      origin: { city: 'Seattle', state: 'WA', zip: '98101' },
      destination: { city: 'Phoenix', state: 'AZ', zip: '85001' },
      distance: 1420,
      rate: 3450,
      ratePerMile: 2.43,
      equipment: 'Van',
      weight: 35000,
      length: 53,
      pickupDate: '2024-01-18',
      deliveryDate: '2024-01-20',
      commodity: 'Consumer Goods',
      broker: 'Swift Logistics',
      brokerRating: 4.4,
      loadType: 'Full Truckload',
      specialRequirements: ['Team Driver Preferred'],
      isFavorite: false,
      status: 'Available',
      timePosted: '30 min ago',
      bidsCount: 3,
      isHot: false,
      priority: 'medium'
    },
    {
      id: 'LD005',
      origin: { city: 'Houston', state: 'TX', zip: '77001' },
      destination: { city: 'Denver', state: 'CO', zip: '80201' },
      distance: 1020,
      rate: 2750,
      ratePerMile: 2.70,
      equipment: 'Step Deck',
      weight: 45000,
      length: 48,
      pickupDate: '2024-01-19',
      deliveryDate: '2024-01-21',
      commodity: 'Machinery',
      broker: 'Heavy Haul Express',
      brokerRating: 4.7,
      loadType: 'Full Truckload',
      specialRequirements: ['Oversize Permit', 'Escort Required'],
      isFavorite: true,
      status: 'Available',
      timePosted: '6 hours ago',
      bidsCount: 15,
      isHot: true,
      priority: 'high'
    }
  ];

  const filteredLoads = loads.filter(load => {
    const matchesSearch = searchQuery === '' || 
      load.origin.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      load.destination.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      load.commodity.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesEquipment = selectedEquipment === 'all' || load.equipment === selectedEquipment;
    const matchesFavorites = !showFavorites || load.isFavorite;
    
    return matchesSearch && matchesEquipment && matchesFavorites;
  });

  const handleBid = (load: Load) => {
    setSelectedLoad(load);
    setBidAmount(load.rate?.toString() || '0');
    setBidComments('');
  };

  const submitBid = () => {
    if (!bidAmount || parseFloat(bidAmount) <= 0) {
      toast.error('Please enter a valid bid amount');
      return;
    }

    toast.success(`Bid submitted for load ${selectedLoad?.id || 'unknown'} - $${bidAmount}`);
    setSelectedLoad(null);
    setBidAmount('');
    setBidComments('');
  };

  const toggleFavorite = (loadId: string) => {
    toast.success('Load added to favorites');
  };

  const contactBroker = (load: Load) => {
    toast.success(`Contacting ${load.broker || 'broker'} about load ${load.id || 'unknown'}`);
  };

  const viewLoadDetails = (load: Load) => {
    toast.info(`Viewing details for load ${load.id || 'unknown'}`);
  };

  const getEquipmentIcon = (equipment: string) => {
    switch (equipment) {
      case 'Van': return '🚐';
      case 'Flatbed': return '🚛';
      case 'Reefer': return '🧊';
      case 'Step Deck': return '🚜';
      default: return '🚚';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-orange-600 bg-orange-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <Layout>
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Load Board</h1>
            <p className="text-muted-foreground">
              Find and bid on available freight loads
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={() => window.location.reload()}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button>
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filters
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="grid gap-4 md:grid-cols-5">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by city or commodity..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedEquipment} onValueChange={setSelectedEquipment}>
                <SelectTrigger>
                  <SelectValue placeholder="Equipment Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Equipment</SelectItem>
                  <SelectItem value="Van">Van</SelectItem>
                  <SelectItem value="Flatbed">Flatbed</SelectItem>
                  <SelectItem value="Reefer">Reefer</SelectItem>
                  <SelectItem value="Step Deck">Step Deck</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedDistance} onValueChange={setSelectedDistance}>
                <SelectTrigger>
                  <SelectValue placeholder="Distance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Distances</SelectItem>
                  <SelectItem value="short">0-500 miles</SelectItem>
                  <SelectItem value="medium">500-1000 miles</SelectItem>
                  <SelectItem value="long">1000+ miles</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rate">Highest Rate</SelectItem>
                  <SelectItem value="distance">Shortest Distance</SelectItem>
                  <SelectItem value="pickup">Pickup Date</SelectItem>
                  <SelectItem value="posted">Recently Posted</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="favorites" 
                  checked={showFavorites}
                  onCheckedChange={(checked) => setShowFavorites(checked === true)}
                />
                <Label htmlFor="favorites" className="text-sm">Favorites Only</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Loads ({filteredLoads.length})</TabsTrigger>
            <TabsTrigger value="hot">Hot Loads ({filteredLoads.filter(l => l.isHot).length})</TabsTrigger>
            <TabsTrigger value="recent">Recent Bids</TabsTrigger>
            <TabsTrigger value="favorites">Favorites ({filteredLoads.filter(l => l.isFavorite).length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Available Loads</CardTitle>
                <CardDescription>
                  {filteredLoads.length} loads matching your criteria
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Lane</TableHead>
                      <TableHead>Equipment</TableHead>
                      <TableHead>Weight/Length</TableHead>
                      <TableHead>Pickup/Delivery</TableHead>
                      <TableHead>Rate</TableHead>
                      <TableHead>Broker</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLoads.map((load) => (
                      <TableRow key={load.id} className="hover:bg-gray-50">
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">{load.origin.city}, {load.origin.state}</span>
                              {load.isHot && <Badge variant="destructive" className="text-xs">HOT</Badge>}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center">
                              ↓ {load.destination.city}, {load.destination.state}
                            </div>
                            <div className="text-xs text-gray-400">{load.distance} miles</div>
                          </div>
                        </TableCell>
                        
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">{getEquipmentIcon(load.equipment)}</span>
                            <div>
                              <div className="font-medium">{load.equipment}</div>
                              <div className="text-xs text-gray-500">{load.commodity}</div>
                            </div>
                          </div>
                        </TableCell>
                        
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center space-x-1">
                              <Weight className="h-3 w-3 text-gray-400" />
                              <span className="text-sm">{load.weight.toLocaleString()} lbs</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Ruler className="h-3 w-3 text-gray-400" />
                              <span className="text-sm">{load.length}ft</span>
                            </div>
                          </div>
                        </TableCell>
                        
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-3 w-3 text-gray-400" />
                              <span className="text-sm">Pick: {load.pickupDate}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-3 w-3 text-gray-400" />
                              <span className="text-sm">Del: {load.deliveryDate}</span>
                            </div>
                          </div>
                        </TableCell>
                        
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-semibold text-green-600 text-lg">
                              ${load.rate.toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-500">
                              ${load.ratePerMile.toFixed(2)}/mile
                            </div>
                          </div>
                        </TableCell>
                        
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-medium">{load.broker}</div>
                            <div className="flex items-center space-x-1">
                              <Star className="h-3 w-3 text-yellow-500 fill-current" />
                              <span className="text-sm">{load.brokerRating}</span>
                            </div>
                          </div>
                        </TableCell>
                        
                        <TableCell>
                          <div className="space-y-1">
                            <Badge className={getPriorityColor(load.priority)}>
                              {load.status}
                            </Badge>
                            <div className="text-xs text-gray-500">
                              {load.bidsCount} bids
                            </div>
                            <div className="text-xs text-gray-400">
                              {load.timePosted}
                            </div>
                          </div>
                        </TableCell>
                        
                        <TableCell>
                          <div className="flex flex-col space-y-2">
                            <Button 
                              size="sm" 
                              onClick={() => handleBid(load)}
                              className="w-full"
                            >
                              Bid Now
                            </Button>
                            <div className="flex space-x-1">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => viewLoadDetails(load)}
                              >
                                <Eye className="h-3 w-3" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => contactBroker(load)}
                              >
                                <Phone className="h-3 w-3" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => toggleFavorite(load.id)}
                              >
                                <Heart className={`h-3 w-3 ${load.isFavorite ? 'fill-current text-red-500' : ''}`} />
                              </Button>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hot" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Hot Loads</CardTitle>
                <CardDescription>
                  High-priority loads with competitive rates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredLoads.filter(load => load.isHot).map((load) => (
                    <Card key={load.id} className="border-red-200 bg-red-50">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <Badge variant="destructive">HOT LOAD</Badge>
                          <Badge className={getPriorityColor(load.priority)}>
                            {load.priority}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="font-semibold">
                            {load.origin.city}, {load.origin.state} → {load.destination.city}, {load.destination.state}
                          </div>
                          <div className="text-2xl font-bold text-green-600">
                            ${load.rate.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-600">
                            {load.distance} miles • ${load.ratePerMile.toFixed(2)}/mile
                          </div>
                          <div className="text-sm">
                            {load.equipment} • {load.commodity}
                          </div>
                          <Button 
                            className="w-full" 
                            onClick={() => handleBid(load)}
                          >
                            Bid Now - {load.bidsCount} bids
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recent" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Bids</CardTitle>
                <CardDescription>
                  Your recent bidding activity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">No recent bids</h3>
                  <p className="text-gray-500">Start bidding on loads to see your activity here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="favorites" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Favorite Loads</CardTitle>
                <CardDescription>
                  Loads you've marked as favorites
                </CardDescription>
              </CardHeader>
              <CardContent>
                {filteredLoads.filter(load => load.isFavorite).length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Lane</TableHead>
                        <TableHead>Equipment</TableHead>
                        <TableHead>Rate</TableHead>
                        <TableHead>Pickup Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredLoads.filter(load => load.isFavorite).map((load) => (
                        <TableRow key={load.id}>
                          <TableCell>
                            {load.origin.city}, {load.origin.state} → {load.destination.city}, {load.destination.state}
                          </TableCell>
                          <TableCell>{load.equipment}</TableCell>
                          <TableCell className="font-semibold text-green-600">
                            ${load.rate.toLocaleString()}
                          </TableCell>
                          <TableCell>{load.pickupDate}</TableCell>
                          <TableCell>
                            <Button size="sm" onClick={() => handleBid(load)}>
                              Bid Now
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8">
                    <Heart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium mb-2">No favorite loads</h3>
                    <p className="text-gray-500">Click the heart icon on loads to add them to favorites</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Bid Dialog */}
        <Dialog open={!!selectedLoad} onOpenChange={() => setSelectedLoad(null)}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Submit Bid - Load {selectedLoad?.id}</DialogTitle>
              <DialogDescription>
                {selectedLoad && (
                  <>
                    {selectedLoad.origin?.city || 'Unknown'}, {selectedLoad.origin?.state || 'Unknown'} → {selectedLoad.destination?.city || 'Unknown'}, {selectedLoad.destination?.state || 'Unknown'}
                  </>
                )}
              </DialogDescription>
            </DialogHeader>
            
            {selectedLoad && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <Label className="text-gray-500">Equipment</Label>
                    <p>{selectedLoad.equipment || 'Unknown'}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500">Distance</Label>
                    <p>{selectedLoad.distance || 0} miles</p>
                  </div>
                  <div>
                    <Label className="text-gray-500">Weight</Label>
                    <p>{(selectedLoad.weight || 0).toLocaleString()} lbs</p>
                  </div>
                  <div>
                    <Label className="text-gray-500">Current Bids</Label>
                    <p>{selectedLoad.bidsCount || 0} bids</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bidAmount">Bid Amount ($)</Label>
                  <Input
                    id="bidAmount"
                    type="number"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    placeholder="Enter your bid amount"
                  />
                  <p className="text-sm text-gray-500">
                    Suggested rate: ${(selectedLoad.rate || 0).toLocaleString()} (${((selectedLoad.ratePerMile || 0) as number).toFixed(2)}/mile)
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bidComments">Comments (Optional)</Label>
                  <Textarea
                    id="bidComments"
                    value={bidComments}
                    onChange={(e) => setBidComments(e.target.value)}
                    placeholder="Add unknown additional information..."
                    rows={3}
                  />
                </div>
              </div>
            )}
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedLoad(null)}>
                Cancel
              </Button>
              <Button onClick={submitBid}>
                Submit Bid
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default LoadBoardPage;