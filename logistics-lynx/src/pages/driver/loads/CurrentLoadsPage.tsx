import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  Package, 
  MapPin, 
  Clock, 
  Truck, 
  DollarSign,
  Search,
  Filter,
  Eye,
  Navigation,
  Phone,
  MessageCircle,
  AlertTriangle,
  CheckCircle2,
  Timer,
  Calendar,
  FileText,
  Download
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface CurrentLoad {
  id: string;
  loadNumber: string;
  customerName: string;
  pickupLocation: string;
  deliveryLocation: string;
  pickupDate: string;
  deliveryDate: string;
  weight: number;
  rate: number;
  status: 'assigned' | 'in-transit' | 'at-pickup' | 'at-delivery' | 'delayed';
  priority: 'high' | 'medium' | 'low';
  distance: number;
  commodity: string;
  specialInstructions?: string;
  customerContact: {
    name: string;
    phone: string;
    email: string;
  };
  progress: number;
}

const CurrentLoadsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedLoad, setSelectedLoad] = useState<CurrentLoad | null>(null);

  const currentLoads: CurrentLoad[] = [
    {
      id: "1",
      loadNumber: "LD-789456",
      customerName: "ABC Manufacturing",
      pickupLocation: "Dallas, TX",
      deliveryLocation: "Oklahoma City, OK",
      pickupDate: "2024-07-19 08:00",
      deliveryDate: "2024-07-19 14:30",
      weight: 45000,
      rate: 2850.00,
      status: "in-transit",
      priority: "high",
      distance: 205,
      commodity: "Steel Components",
      specialInstructions: "Fragile - Handle with care. Tarped load required.",
      customerContact: {
        name: "Sarah Johnson",
        phone: "(214) 555-0123",
        email: "sarah.johnson@abcmfg.com"
      },
      progress: 65
    },
    {
      id: "2",
      loadNumber: "LD-123789",
      customerName: "Retail Distribution Center",
      pickupLocation: "Houston, TX",
      deliveryLocation: "Denver, CO",
      pickupDate: "2024-07-20 06:00",
      deliveryDate: "2024-07-21 18:00",
      weight: 38500,
      rate: 3200.00,
      status: "assigned",
      priority: "medium",
      distance: 925,
      commodity: "Consumer Electronics",
      specialInstructions: "Temperature controlled required. Signature required for delivery.",
      customerContact: {
        name: "Mike Rodriguez",
        phone: "(713) 555-0198",
        email: "mike.rodriguez@retaildc.com"
      },
      progress: 0
    },
    {
      id: "3",
      loadNumber: "LD-456123",
      customerName: "Food Processing Inc",
      pickupLocation: "San Antonio, TX",
      deliveryLocation: "Phoenix, AZ",
      pickupDate: "2024-07-21 10:00",
      deliveryDate: "2024-07-22 20:00",
      weight: 42000,
      rate: 2950.00,
      status: "at-pickup",
      priority: "high",
      distance: 856,
      commodity: "Frozen Foods",
      specialInstructions: "Reefer load. Maintain -10°F. Time-sensitive delivery.",
      customerContact: {
        name: "Lisa Chen",
        phone: "(210) 555-0287",
        email: "lisa.chen@foodproc.com"
      },
      progress: 15
    },
    {
      id: "4",
      loadNumber: "LD-789012",
      customerName: "Construction Materials LLC",
      pickupLocation: "Austin, TX",
      deliveryLocation: "Las Vegas, NV",
      pickupDate: "2024-07-22 07:00",
      deliveryDate: "2024-07-23 16:00",
      weight: 49500,
      rate: 3100.00,
      status: "delayed",
      priority: "medium",
      distance: 1089,
      commodity: "Building Materials",
      specialInstructions: "Oversized load permit required. Escort vehicle needed.",
      customerContact: {
        name: "David Wang",
        phone: "(512) 555-0341",
        email: "david.wang@constructmat.com"
      },
      progress: 25
    },
    {
      id: "5",
      loadNumber: "LD-345678",
      customerName: "Tech Solutions Corp",
      pickupLocation: "Fort Worth, TX",
      deliveryLocation: "Seattle, WA",
      pickupDate: "2024-07-23 05:00",
      deliveryDate: "2024-07-25 15:00",
      weight: 25000,
      rate: 4200.00,
      status: "assigned",
      priority: "low",
      distance: 2050,
      commodity: "Computer Equipment",
      specialInstructions: "High-value cargo. Additional security required.",
      customerContact: {
        name: "Jennifer Martinez",
        phone: "(817) 555-0456",
        email: "jennifer.martinez@techsolutions.com"
      },
      progress: 0
    }
  ];

  const filteredLoads = currentLoads.filter(load => {
    const matchesSearch = load.loadNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         load.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         load.commodity.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || load.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || load.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusBadge = (status: string) => {
    const variants = {
      'assigned': 'bg-blue-100 text-blue-700 border-blue-200',
      'in-transit': 'bg-green-100 text-green-700 border-green-200',
      'at-pickup': 'bg-yellow-100 text-yellow-700 border-yellow-200',
      'at-delivery': 'bg-purple-100 text-purple-700 border-purple-200',
      'delayed': 'bg-red-100 text-red-700 border-red-200'
    };
    
    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {status.replace('-', ' ').toUpperCase()}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const variants = {
      'high': 'bg-red-100 text-red-700 border-red-200',
      'medium': 'bg-yellow-100 text-yellow-700 border-yellow-200',
      'low': 'bg-green-100 text-green-700 border-green-200'
    };
    
    return (
      <Badge variant="outline" className={variants[priority as keyof typeof variants]}>
        {priority.toUpperCase()}
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

  const handleStartLoad = (loadId: string) => {
    console.log(`Starting load ${loadId}`);
    // Mock start load functionality
  };

  const handleContactCustomer = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  const handleSendMessage = (contactName: string) => {
    console.log(`Sending message to ${contactName}`);
    // Mock SMS functionality
  };

  const handleNavigate = (location: string) => {
    window.open(`https://maps.google.com?q=${encodeURIComponent(location)}`, '_blank');
  };

  const handleDownloadBOL = (loadNumber: string) => {
    console.log(`Downloading BOL for ${loadNumber}`);
    // Mock download functionality
  };

  const totalLoads = filteredLoads.length;
  const totalValue = filteredLoads.reduce((sum, load) => sum + load.rate, 0);
  const totalWeight = filteredLoads.reduce((sum, load) => sum + load.weight, 0);
  const activeLoads = filteredLoads.filter(load => ['in-transit', 'at-pickup', 'at-delivery'].includes(load.status)).length;

  return (
    <div className="w-full max-w-none p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            Current Loads
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your assigned and active loads
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Loads
          </Button>
          <Button className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600">
            <Package className="w-4 h-4 mr-2" />
            Refresh Loads
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass-subtle border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Loads</p>
                <p className="text-2xl font-bold text-blue-600">{totalLoads}</p>
              </div>
              <Package className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-subtle border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Loads</p>
                <p className="text-2xl font-bold text-green-600">{activeLoads}</p>
              </div>
              <Truck className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-subtle border-l-4 border-l-yellow-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Value</p>
                <p className="text-2xl font-bold text-yellow-600">{formatCurrency(totalValue)}</p>
              </div>
              <DollarSign className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-subtle border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Weight</p>
                <p className="text-2xl font-bold text-purple-600">{formatWeight(totalWeight)}</p>
              </div>
              <Package className="w-8 h-8 text-purple-500" />
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
                  placeholder="Search by load number, customer, or commodity..."
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
                <SelectItem value="assigned">Assigned</SelectItem>
                <SelectItem value="in-transit">In Transit</SelectItem>
                <SelectItem value="at-pickup">At Pickup</SelectItem>
                <SelectItem value="at-delivery">At Delivery</SelectItem>
                <SelectItem value="delayed">Delayed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-full lg:w-48 bg-background z-50">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent className="z-50 bg-background border shadow-lg">
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="high">High Priority</SelectItem>
                <SelectItem value="medium">Medium Priority</SelectItem>
                <SelectItem value="low">Low Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Loads Table */}
      <Card className="glass-subtle">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5 text-red-500" />
            Current Loads ({filteredLoads.length})
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
                  <TableHead>Schedule</TableHead>
                  <TableHead>Weight</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Progress</TableHead>
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
                        <div className="text-xs text-muted-foreground">{load.distance} miles</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(load.pickupDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {new Date(load.deliveryDate).toLocaleDateString()}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{formatWeight(load.weight)}</TableCell>
                    <TableCell className="font-medium text-green-600">
                      {formatCurrency(load.rate)}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(load.status)}
                    </TableCell>
                    <TableCell>
                      {getPriorityBadge(load.priority)}
                    </TableCell>
                    <TableCell>
                      <div className="w-full">
                        <Progress value={load.progress} className="w-20 h-2" />
                        <span className="text-xs text-muted-foreground">{load.progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
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
                                Manage your current load assignment including navigation, documentation, and communication.
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
                                        <label className="text-sm font-medium text-muted-foreground">Rate</label>
                                        <p className="text-lg font-semibold text-green-600">{formatCurrency(selectedLoad.rate)}</p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium text-muted-foreground">Distance</label>
                                        <p className="text-lg">{selectedLoad.distance} miles</p>
                                      </div>
                                    </CardContent>
                                  </Card>

                                  <Card>
                                    <CardHeader>
                                      <CardTitle className="text-lg">Schedule & Status</CardTitle>
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
                                        <label className="text-sm font-medium text-muted-foreground">Status</label>
                                        <div className="mt-1">
                                          {getStatusBadge(selectedLoad.status)}
                                        </div>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium text-muted-foreground">Priority</label>
                                        <div className="mt-1">
                                          {getPriorityBadge(selectedLoad.priority)}
                                        </div>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium text-muted-foreground">Progress</label>
                                        <div className="mt-2">
                                          <Progress value={selectedLoad.progress} className="w-full h-3" />
                                          <span className="text-sm text-muted-foreground">{selectedLoad.progress}% complete</span>
                                        </div>
                                      </div>
                                    </CardContent>
                                  </Card>
                                </div>

                                {/* Locations */}
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg">Route Information</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                      <div>
                                        <h4 className="font-semibold text-green-600 mb-2">Pickup Location</h4>
                                        <p className="text-lg">{selectedLoad.pickupLocation}</p>
                                        <Button 
                                          variant="outline" 
                                          size="sm" 
                                          className="mt-2"
                                          onClick={() => handleNavigate(selectedLoad.pickupLocation)}
                                        >
                                          <Navigation className="w-4 h-4 mr-1" />
                                          Navigate
                                        </Button>
                                      </div>
                                      <div>
                                        <h4 className="font-semibold text-red-600 mb-2">Delivery Location</h4>
                                        <p className="text-lg">{selectedLoad.deliveryLocation}</p>
                                        <Button 
                                          variant="outline" 
                                          size="sm" 
                                          className="mt-2"
                                          onClick={() => handleNavigate(selectedLoad.deliveryLocation)}
                                        >
                                          <Navigation className="w-4 h-4 mr-1" />
                                          Navigate
                                        </Button>
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
                                    <div className="flex gap-2 mt-4">
                                      <Button 
                                        variant="outline" 
                                        size="sm"
                                        onClick={() => handleContactCustomer(selectedLoad.customerContact.phone)}
                                      >
                                        <Phone className="w-4 h-4 mr-1" />
                                        Call
                                      </Button>
                                      <Button 
                                        variant="outline" 
                                        size="sm"
                                        onClick={() => handleSendMessage(selectedLoad.customerContact.name)}
                                      >
                                        <MessageCircle className="w-4 h-4 mr-1" />
                                        Message
                                      </Button>
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

                                {/* Actions */}
                                <div className="flex flex-wrap gap-3 pt-4 border-t">
                                  {selectedLoad.status === 'assigned' && (
                                    <Button 
                                      className="bg-green-500 hover:bg-green-600"
                                      onClick={() => handleStartLoad(selectedLoad.id)}
                                    >
                                      <Timer className="w-4 h-4 mr-2" />
                                      Start Load
                                    </Button>
                                  )}
                                  <Button 
                                    variant="outline"
                                    onClick={() => handleDownloadBOL(selectedLoad.loadNumber)}
                                  >
                                    <FileText className="w-4 h-4 mr-2" />
                                    Download BOL
                                  </Button>
                                  <Button 
                                    variant="outline"
                                    onClick={() => handleNavigate(selectedLoad.pickupLocation)}
                                  >
                                    <Navigation className="w-4 h-4 mr-2" />
                                    Navigate to Pickup
                                  </Button>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {filteredLoads.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium">No loads found</h3>
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

export default CurrentLoadsPage;