import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { useToast } from '../ui/use-toast';
import { Search, Filter, MapPin, Truck, Package, DollarSign, Clock, Star, MessageSquare, Eye, Heart } from 'lucide-react';
import { useRole } from '../../context/role-context';

// Mock data for loads
interface Load {
  id: string;
  title: string;
  origin: string;
  destination: string;
  equipment: string;
  weight: string;
  rate: string;
  postedBy: string;
  postedDate: string;
  status: 'open' | 'in_progress' | 'completed' | 'expired';
  description: string;
  requirements: string[];
  bids: number;
  distance: string;
  pickupDate: string;
  deliveryDate: string;
  commodity: string;
  specialRequirements: string[];
  contactInfo: {
    name: string;
    phone: string;
    email: string;
  };
}

const mockLoads: Load[] = [
  {
    id: 'LB-001',
    title: 'Electronics from LA to NYC',
    origin: 'Los Angeles, CA',
    destination: 'New York, NY',
    equipment: 'Dry Van',
    weight: '45,000 lbs',
    rate: '$4,200',
    postedBy: 'TechCorp Logistics',
    postedDate: '2 hours ago',
    status: 'open',
    description: 'High-value electronics shipment requiring temperature control and security.',
    requirements: ['Temperature Control', 'Security', 'Lift Gate'],
    bids: 8,
    distance: '2,789 miles',
    pickupDate: '2024-01-15',
    deliveryDate: '2024-01-18',
    commodity: 'Electronics',
    specialRequirements: ['White Glove Service', 'Inside Delivery'],
    contactInfo: {
      name: 'John Smith',
      phone: '(555) 123-4567',
      email: 'john@techcorp.com'
    }
  },
  {
    id: 'LB-002',
    title: 'Automotive Parts - Chicago to Dallas',
    origin: 'Chicago, IL',
    destination: 'Dallas, TX',
    equipment: 'Flatbed',
    weight: '32,000 lbs',
    rate: '$2,800',
    postedBy: 'AutoParts Express',
    postedDate: '1 hour ago',
    status: 'open',
    description: 'Automotive parts requiring flatbed transport with tarping.',
    requirements: ['Flatbed', 'Tarping', 'Chain Down'],
    bids: 5,
    distance: '925 miles',
    pickupDate: '2024-01-16',
    deliveryDate: '2024-01-17',
    commodity: 'Automotive Parts',
    specialRequirements: ['Chain Down', 'Tarping Required'],
    contactInfo: {
      name: 'Sarah Johnson',
      phone: '(555) 987-6543',
      email: 'sarah@autoparts.com'
    }
  },
  {
    id: 'LB-003',
    title: 'Food & Beverage - Miami to Atlanta',
    origin: 'Miami, FL',
    destination: 'Atlanta, GA',
    equipment: 'Reefer',
    weight: '38,000 lbs',
    rate: '$3,100',
    postedBy: 'Fresh Foods Co',
    postedDate: '30 minutes ago',
    status: 'open',
    description: 'Perishable food items requiring refrigerated transport.',
    requirements: ['Reefer', 'Temperature Control', 'Food Grade'],
    bids: 12,
    distance: '662 miles',
    pickupDate: '2024-01-15',
    deliveryDate: '2024-01-16',
    commodity: 'Food & Beverage',
    specialRequirements: ['Food Grade Trailer', 'Temperature Monitoring'],
    contactInfo: {
      name: 'Mike Wilson',
      phone: '(555) 456-7890',
      email: 'mike@freshfoods.com'
    }
  }
];

export const LoadBoardPortal: React.FC = () => {
  const { toast } = useToast();
  const { currentRole, roleInfo } = useRole();
  
  const [loads, setLoads] = useState<Load[]>(mockLoads);
  const [filteredLoads, setFilteredLoads] = useState<Load[]>(mockLoads);
  const [searchQuery, setSearchQuery] = useState('');
  const [equipmentFilter, setEquipmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedLoad, setSelectedLoad] = useState<Load | null>(null);
  const [showPostLoadDialog, setShowPostLoadDialog] = useState(false);
  const [showBidDialog, setShowBidDialog] = useState(false);
  const [activeTab, setActiveTab] = useState('browse');

  // Filter loads based on search and filters
  useEffect(() => {
    const filtered = loads.filter(load => {
      const matchesSearch = 
        load.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        load.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        load.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
        load.commodity.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesEquipment = equipmentFilter === 'all' || load.equipment === equipmentFilter;
      const matchesStatus = statusFilter === 'all' || load.status === statusFilter;
      
      return matchesSearch && matchesEquipment && matchesStatus;
    });
    
    setFilteredLoads(filtered);
  }, [loads, searchQuery, equipmentFilter, statusFilter]);

  const handlePostLoad = () => {
    toast({
      title: 'Load Posted',
      description: 'Your load has been successfully posted to the board.',
      variant: 'default'
    });
    setShowPostLoadDialog(false);
  };

  const handleBidOnLoad = (loadId: string, bidAmount: string) => {
    toast({
      title: 'Bid Submitted',
      description: `Your bid of $${bidAmount} has been submitted for load ${loadId}.`,
      variant: 'default'
    });
    setShowBidDialog(false);
  };

  const handleFavoriteLoad = (loadId: string) => {
    toast({
      title: 'Added to Favorites',
      description: 'Load has been added to your favorites.',
      variant: 'default'
    });
  };

  const getRoleSpecificActions = () => {
    switch (currentRole) {
      case 'shipper_admin':
        return (
          <Button onClick={() => setShowPostLoadDialog(true)} className="bg-blue-600 hover:bg-blue-700">
            <Package className="h-4 w-4 mr-2" />
            Post New Load
          </Button>
        );
      case 'carrier_admin':
      case 'owner_operator':
        return (
          <div className="flex space-x-2">
            <Button variant="outline">
              <Truck className="h-4 w-4 mr-2" />
              Post Capacity
            </Button>
            <Button variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              My Bids
            </Button>
          </div>
        );
      case 'freight_broker_admin':
        return (
          <div className="flex space-x-2">
            <Button onClick={() => setShowPostLoadDialog(true)} className="bg-blue-600 hover:bg-blue-700">
              <Package className="h-4 w-4 mr-2" />
              Post Load
            </Button>
            <Button variant="outline">
              <MessageSquare className="h-4 w-4 mr-2" />
              Manage Loads
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">📋 Load Board</h1>
              <p className="text-gray-600">Central marketplace for freight loads and capacity</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-sm">
                {roleInfo.name}
              </Badge>
              {getRoleSpecificActions()}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="browse">Browse Loads</TabsTrigger>
            <TabsTrigger value="my-loads">My Loads</TabsTrigger>
            <TabsTrigger value="my-bids">My Bids</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardHeader>
                <CardTitle>Search & Filter Loads</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search loads..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={equipmentFilter} onValueChange={setEquipmentFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Equipment Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Equipment</SelectItem>
                      <SelectItem value="Dry Van">Dry Van</SelectItem>
                      <SelectItem value="Reefer">Reefer</SelectItem>
                      <SelectItem value="Flatbed">Flatbed</SelectItem>
                      <SelectItem value="Power Only">Power Only</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="flex items-center">
                    <Filter className="h-4 w-4 mr-2" />
                    Advanced Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Loads Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredLoads.map((load) => (
                <Card key={load.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{load.title}</CardTitle>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge variant={load.status === 'open' ? 'default' : 'secondary'}>
                            {load.status.replace('_', ' ')}
                          </Badge>
                          <Badge variant="outline">{load.equipment}</Badge>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleFavoriteLoad(load.id)}
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">
                          {load.origin} → {load.destination}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Package className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{load.weight} • {load.commodity}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-medium text-green-600">{load.rate}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">
                          Pickup: {load.pickupDate} • Delivery: {load.deliveryDate}
                        </span>
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm text-gray-600">{load.bids} bids</span>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedLoad(load)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          {(currentRole === 'carrier_admin' || currentRole === 'owner_operator') && (
                            <Button
                              size="sm"
                              onClick={() => {
                                setSelectedLoad(load);
                                setShowBidDialog(true);
                              }}
                            >
                              <DollarSign className="h-4 w-4 mr-1" />
                              Bid
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="my-loads" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Posted Loads</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  {currentRole === 'shipper_admin' || currentRole === 'freight_broker_admin' 
                    ? 'Your posted loads will appear here'
                    : 'Only shippers and brokers can post loads'}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="my-bids" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Bids</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  {currentRole === 'carrier_admin' || currentRole === 'owner_operator'
                    ? 'Your submitted bids will appear here'
                    : 'Only carriers and owner-operators can bid on loads'}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Total Loads</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600">{loads.length}</div>
                  <p className="text-sm text-gray-600">Active loads on board</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Average Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">$3,367</div>
                  <p className="text-sm text-gray-600">Per load average</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Total Bids</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600">25</div>
                  <p className="text-sm text-gray-600">Bids submitted today</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Load Details Dialog */}
      <Dialog open={!!selectedLoad} onOpenChange={() => setSelectedLoad(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedLoad?.title}</DialogTitle>
          </DialogHeader>
          {selectedLoad && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold">Route</h4>
                  <p className="text-sm text-gray-600">{selectedLoad.origin} → {selectedLoad.destination}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Rate</h4>
                  <p className="text-lg font-bold text-green-600">{selectedLoad.rate}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Equipment</h4>
                  <p className="text-sm text-gray-600">{selectedLoad.equipment}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Weight</h4>
                  <p className="text-sm text-gray-600">{selectedLoad.weight}</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold">Description</h4>
                <p className="text-sm text-gray-600">{selectedLoad.description}</p>
              </div>
              <div>
                <h4 className="font-semibold">Requirements</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedLoad.requirements.map((req, index) => (
                    <Badge key={index} variant="outline">{req}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold">Contact Information</h4>
                <div className="text-sm text-gray-600">
                  <p>{selectedLoad.contactInfo.name}</p>
                  <p>{selectedLoad.contactInfo.phone}</p>
                  <p>{selectedLoad.contactInfo.email}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Post Load Dialog */}
      <Dialog open={showPostLoadDialog} onOpenChange={setShowPostLoadDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Post New Load</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Origin</label>
                <Input placeholder="City, State" />
              </div>
              <div>
                <label className="text-sm font-medium">Destination</label>
                <Input placeholder="City, State" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Equipment Type</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select equipment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dry-van">Dry Van</SelectItem>
                    <SelectItem value="reefer">Reefer</SelectItem>
                    <SelectItem value="flatbed">Flatbed</SelectItem>
                    <SelectItem value="power-only">Power Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Rate</label>
                <Input placeholder="$0.00" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <Input placeholder="Load description..." />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowPostLoadDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handlePostLoad}>
                Post Load
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Bid Dialog */}
      <Dialog open={showBidDialog} onOpenChange={setShowBidDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit Bid</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Bid Amount</label>
              <Input placeholder="$0.00" />
            </div>
            <div>
              <label className="text-sm font-medium">Notes</label>
              <Input placeholder="Additional notes..." />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowBidDialog(false)}>
                Cancel
              </Button>
              <Button onClick={() => handleBidOnLoad(selectedLoad?.id || '', '3,800')}>
                Submit Bid
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LoadBoardPortal;
