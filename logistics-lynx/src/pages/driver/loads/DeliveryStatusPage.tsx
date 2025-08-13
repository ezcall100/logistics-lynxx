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
import { Textarea } from '@/components/ui/textarea';
import { 
  Package, 
  MapPin, 
  Clock, 
  Truck, 
  CheckCircle2,
  AlertTriangle,
  Timer,
  Search,
  Filter,
  Eye,
  Navigation,
  Phone,
  MessageCircle,
  Calendar,
  FileText,
  Camera,
  Upload,
  Save,
  TrendingUp,
  DollarSign
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface DeliveryLoad {
  id: string;
  loadNumber: string;
  customerName: string;
  deliveryLocation: string;
  deliveryDate: string;
  weight: number;
  rate: number;
  status: 'en-route' | 'arrived' | 'unloading' | 'completed' | 'delayed' | 'issue';
  priority: 'high' | 'medium' | 'low';
  commodity: string;
  arrivalTime?: string;
  completionTime?: string;
  deliveryNotes?: string;
  customerContact: {
    name: string;
    phone: string;
    email: string;
  };
  progress: number;
  estimatedArrival: string;
  actualArrival?: string;
  signatureRequired: boolean;
  photoRequired: boolean;
  specialInstructions?: string;
}

const DeliveryStatusPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedLoad, setSelectedLoad] = useState<DeliveryLoad | null>(null);
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);

  const deliveryLoads: DeliveryLoad[] = [
    {
      id: "1",
      loadNumber: "LD-789456",
      customerName: "ABC Manufacturing",
      deliveryLocation: "1425 Industrial Blvd, Oklahoma City, OK 73102",
      deliveryDate: "2024-07-19 14:30",
      weight: 45000,
      rate: 2850.00,
      status: "arrived",
      priority: "high",
      commodity: "Steel Components",
      arrivalTime: "2024-07-19 14:15",
      customerContact: {
        name: "Sarah Johnson",
        phone: "(405) 555-0123",
        email: "sarah.johnson@abcmfg.com"
      },
      progress: 85,
      estimatedArrival: "14:30",
      actualArrival: "14:15",
      signatureRequired: true,
      photoRequired: true,
      specialInstructions: "Dock #3, bring BOL. Fragile - Handle with care."
    },
    {
      id: "2",
      loadNumber: "LD-456123",
      customerName: "Food Processing Inc",
      deliveryLocation: "567 Commerce Dr, Phoenix, AZ 85001",
      deliveryDate: "2024-07-19 20:00",
      weight: 42000,
      rate: 2950.00,
      status: "en-route",
      priority: "high",
      commodity: "Frozen Foods",
      customerContact: {
        name: "Lisa Chen",
        phone: "(602) 555-0287",
        email: "lisa.chen@foodproc.com"
      },
      progress: 65,
      estimatedArrival: "19:45",
      signatureRequired: true,
      photoRequired: false,
      specialInstructions: "Reefer load. Maintain -10°F. Time-sensitive delivery."
    },
    {
      id: "3",
      loadNumber: "LD-123789",
      customerName: "Retail Distribution Center",
      deliveryLocation: "890 Distribution Pkwy, Denver, CO 80202",
      deliveryDate: "2024-07-20 18:00",
      weight: 38500,
      rate: 3200.00,
      status: "unloading",
      priority: "medium",
      commodity: "Consumer Electronics",
      arrivalTime: "2024-07-20 17:45",
      customerContact: {
        name: "Mike Rodriguez",
        phone: "(303) 555-0198",
        email: "mike.rodriguez@retaildc.com"
      },
      progress: 95,
      estimatedArrival: "18:00",
      actualArrival: "17:45",
      signatureRequired: true,
      photoRequired: true,
      specialInstructions: "Temperature controlled required. Signature required for delivery."
    },
    {
      id: "4",
      loadNumber: "LD-789012",
      customerName: "Construction Materials LLC",
      deliveryLocation: "2340 Manufacturing Way, Las Vegas, NV 89101",
      deliveryDate: "2024-07-21 16:00",
      weight: 49500,
      rate: 3100.00,
      status: "delayed",
      priority: "medium",
      commodity: "Building Materials",
      customerContact: {
        name: "David Wang",
        phone: "(702) 555-0341",
        email: "david.wang@constructmat.com"
      },
      progress: 45,
      estimatedArrival: "18:30",
      signatureRequired: false,
      photoRequired: true,
      specialInstructions: "Oversized load permit required. Escort vehicle needed.",
      deliveryNotes: "Delayed due to weather conditions. Customer notified."
    },
    {
      id: "5",
      loadNumber: "LD-345678",
      customerName: "Tech Solutions Corp",
      deliveryLocation: "456 Tech Center Dr, Seattle, WA 98101",
      deliveryDate: "2024-07-22 15:00",
      weight: 25000,
      rate: 4200.00,
      status: "completed",
      priority: "low",
      commodity: "Computer Equipment",
      arrivalTime: "2024-07-22 14:45",
      completionTime: "2024-07-22 15:30",
      customerContact: {
        name: "Jennifer Martinez",
        phone: "(206) 555-0456",
        email: "jennifer.martinez@techsolutions.com"
      },
      progress: 100,
      estimatedArrival: "15:00",
      actualArrival: "14:45",
      signatureRequired: true,
      photoRequired: true,
      specialInstructions: "High-value cargo. Additional security required.",
      deliveryNotes: "Delivery completed successfully. Customer satisfied with service."
    }
  ];

  const filteredLoads = deliveryLoads.filter(load => {
    const matchesSearch = load.loadNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         load.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         load.commodity.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || load.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || load.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusBadge = (status: string) => {
    const variants = {
      'en-route': 'bg-blue-100 text-blue-700 border-blue-200',
      'arrived': 'bg-green-100 text-green-700 border-green-200',
      'unloading': 'bg-purple-100 text-purple-700 border-purple-200',
      'completed': 'bg-gray-100 text-gray-700 border-gray-200',
      'delayed': 'bg-red-100 text-red-700 border-red-200',
      'issue': 'bg-orange-100 text-orange-700 border-orange-200'
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

  const handleUpdateStatus = (loadId: string, newStatus: string) => {
    console.log(`Updating load ${loadId} to ${newStatus}`);
    // Mock status update functionality
  };

  const handleCompleteDelivery = (loadId: string) => {
    console.log(`Completing delivery for load ${loadId}`);
    setShowCompletionDialog(true);
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

  const handleTakePhoto = () => {
    console.log('Opening camera for delivery photo');
    // Mock camera functionality
  };

  const handleUploadPOD = () => {
    console.log('Uploading Proof of Delivery');
    // Mock upload functionality
  };

  const handleSaveNotes = () => {
    console.log('Saving delivery notes:', deliveryNotes);
    // Mock save functionality
  };

  const totalDeliveries = filteredLoads.length;
  const completedDeliveries = filteredLoads.filter(load => load.status === 'completed').length;
  const pendingDeliveries = filteredLoads.filter(load => ['en-route', 'arrived', 'unloading'].includes(load.status)).length;
  const delayedDeliveries = filteredLoads.filter(load => load.status === 'delayed').length;
  
  console.log('DeliveryStatusPage rendering, filteredLoads:', filteredLoads.length);
  
  return (
    <div className="w-full max-w-none p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            Delivery Status
          </h1>
          <p className="text-muted-foreground mt-1">
            Track and manage your delivery progress
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <FileText className="w-4 h-4 mr-2" />
            Delivery Report
          </Button>
          <Button className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600">
            <TrendingUp className="w-4 h-4 mr-2" />
            Update Status
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass-subtle border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Deliveries</p>
                <p className="text-2xl font-bold text-blue-600">{totalDeliveries}</p>
              </div>
              <Package className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-subtle border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-green-600">{completedDeliveries}</p>
              </div>
              <CheckCircle2 className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-subtle border-l-4 border-l-yellow-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingDeliveries}</p>
              </div>
              <Timer className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-subtle border-l-4 border-l-red-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Delayed</p>
                <p className="text-2xl font-bold text-red-600">{delayedDeliveries}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
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
                <SelectItem value="en-route">En Route</SelectItem>
                <SelectItem value="arrived">Arrived</SelectItem>
                <SelectItem value="unloading">Unloading</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="delayed">Delayed</SelectItem>
                <SelectItem value="issue">Issue</SelectItem>
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

      {/* Delivery Status Table */}
      <Card className="glass-subtle">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-red-500" />
            Delivery Status ({filteredLoads.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Load #</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Delivery Location</TableHead>
                  <TableHead>Schedule</TableHead>
                  <TableHead>Weight</TableHead>
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
                      <div className="text-sm max-w-48">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-red-500" />
                          <span className="truncate">{load.deliveryLocation}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>ETA: {load.estimatedArrival}</span>
                        </div>
                        {load.actualArrival && (
                          <div className="flex items-center gap-1 text-green-600">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Arrived: {load.actualArrival}</span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{formatWeight(load.weight)}</TableCell>
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
                              <DialogTitle>Delivery Details - {load.loadNumber}</DialogTitle>
                            </DialogHeader>
                            {selectedLoad && (
                              <div className="space-y-6">
                                {/* Delivery Information */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <Card>
                                    <CardHeader>
                                      <CardTitle className="text-lg">Delivery Information</CardTitle>
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
                                    </CardContent>
                                  </Card>

                                  <Card>
                                    <CardHeader>
                                      <CardTitle className="text-lg">Status & Timeline</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                      <div>
                                        <label className="text-sm font-medium text-muted-foreground">Delivery Date</label>
                                        <p className="text-lg">{new Date(selectedLoad.deliveryDate).toLocaleString()}</p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium text-muted-foreground">Estimated Arrival</label>
                                        <p className="text-lg">{selectedLoad.estimatedArrival}</p>
                                      </div>
                                      {selectedLoad.actualArrival && (
                                        <div>
                                          <label className="text-sm font-medium text-muted-foreground">Actual Arrival</label>
                                          <p className="text-lg text-green-600">{selectedLoad.actualArrival}</p>
                                        </div>
                                      )}
                                      <div>
                                        <label className="text-sm font-medium text-muted-foreground">Status</label>
                                        <div className="mt-1">
                                          {getStatusBadge(selectedLoad.status)}
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

                                {/* Delivery Location */}
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg">Delivery Location</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="flex items-start justify-between">
                                      <div>
                                        <p className="text-lg">{selectedLoad.deliveryLocation}</p>
                                        <div className="flex gap-2 mt-3">
                                          <Button 
                                            variant="outline" 
                                            size="sm"
                                            onClick={() => handleNavigate(selectedLoad.deliveryLocation)}
                                          >
                                            <Navigation className="w-4 h-4 mr-1" />
                                            Navigate
                                          </Button>
                                        </div>
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

                                {/* Delivery Requirements */}
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg">Delivery Requirements</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div className="flex items-center gap-3">
                                        <div className={cn(
                                          "w-4 h-4 rounded-full",
                                          selectedLoad.signatureRequired ? "bg-green-500" : "bg-gray-300"
                                        )} />
                                        <span>Signature Required</span>
                                      </div>
                                      <div className="flex items-center gap-3">
                                        <div className={cn(
                                          "w-4 h-4 rounded-full",
                                          selectedLoad.photoRequired ? "bg-green-500" : "bg-gray-300"
                                        )} />
                                        <span>Photo Required</span>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>

                                {/* Delivery Notes */}
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg">Delivery Notes</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <Textarea
                                      placeholder="Add delivery notes..."
                                      value={selectedLoad.deliveryNotes || deliveryNotes}
                                      onChange={(e) => setDeliveryNotes(e.target.value)}
                                      rows={3}
                                    />
                                    <Button 
                                      variant="outline" 
                                      size="sm" 
                                      className="mt-2"
                                      onClick={handleSaveNotes}
                                    >
                                      <Save className="w-4 h-4 mr-1" />
                                      Save Notes
                                    </Button>
                                  </CardContent>
                                </Card>

                                {/* Actions */}
                                <div className="flex flex-wrap gap-3 pt-4 border-t">
                                  {selectedLoad.status === 'en-route' && (
                                    <Button 
                                      className="bg-blue-500 hover:bg-blue-600"
                                      onClick={() => handleUpdateStatus(selectedLoad.id, 'arrived')}
                                    >
                                      <MapPin className="w-4 h-4 mr-2" />
                                      Mark as Arrived
                                    </Button>
                                  )}
                                  
                                  {selectedLoad.status === 'arrived' && (
                                    <Button 
                                      className="bg-purple-500 hover:bg-purple-600"
                                      onClick={() => handleUpdateStatus(selectedLoad.id, 'unloading')}
                                    >
                                      <Package className="w-4 h-4 mr-2" />
                                      Start Unloading
                                    </Button>
                                  )}
                                  
                                  {(selectedLoad.status === 'unloading' || selectedLoad.status === 'arrived') && (
                                    <Button 
                                      className="bg-green-500 hover:bg-green-600"
                                      onClick={() => handleCompleteDelivery(selectedLoad.id)}
                                    >
                                      <CheckCircle2 className="w-4 h-4 mr-2" />
                                      Complete Delivery
                                    </Button>
                                  )}
                                  
                                  <Button 
                                    variant="outline"
                                    onClick={handleTakePhoto}
                                  >
                                    <Camera className="w-4 h-4 mr-2" />
                                    Take Photo
                                  </Button>
                                  
                                  <Button 
                                    variant="outline"
                                    onClick={handleUploadPOD}
                                  >
                                    <Upload className="w-4 h-4 mr-2" />
                                    Upload POD
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
              <Truck className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium">No deliveries found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Completion Dialog */}
      <Dialog open={showCompletionDialog} onOpenChange={setShowCompletionDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Complete Delivery</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>Please confirm that the delivery has been completed successfully.</p>
            <Textarea
              placeholder="Final delivery notes (optional)..."
              value={deliveryNotes}
              onChange={(e) => setDeliveryNotes(e.target.value)}
              rows={3}
            />
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowCompletionDialog(false)}>
                Cancel
              </Button>
              <Button 
                className="bg-green-500 hover:bg-green-600"
                onClick={() => {
                  console.log('Delivery completed');
                  setShowCompletionDialog(false);
                }}
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Complete Delivery
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeliveryStatusPage;