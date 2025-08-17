import React, { useState } from 'react';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell, 
  TableCaption 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/components/ui/use-toast';
import { 
  Truck, 
  Package, 
  MapPin, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Edit, 
  Trash2, 
  Plus, 
  Search,
  Filter,
  Download,
  RefreshCw,
  Eye,
  Calendar,
  User,
  Phone,
  Mail
} from 'lucide-react';

// Types
interface Shipment {
  id: string;
  trackingNumber: string;
  origin: string;
  destination: string;
  status: 'pending' | 'in-transit' | 'delivered' | 'delayed';
  carrier: string;
  driver: string;
  pickupDate: string;
  deliveryDate: string;
  cost: number;
  weight: number;
  priority: 'low' | 'medium' | 'high';
}

interface Driver {
  id: string;
  name: string;
  phone: string;
  email: string;
  license: string;
  status: 'available' | 'on-delivery' | 'off-duty';
  rating: number;
  totalDeliveries: number;
  vehicle: string;
}

interface Carrier {
  id: string;
  name: string;
  contact: string;
  phone: string;
  email: string;
  rating: number;
  totalShipments: number;
  status: 'active' | 'inactive';
  specialties: string[];
}

// Sample Data
const sampleShipments: Shipment[] = [
  {
    id: 'SHP-001',
    trackingNumber: 'TRK-2024-001',
    origin: 'Los Angeles, CA',
    destination: 'New York, NY',
    status: 'in-transit',
    carrier: 'FastFreight Express',
    driver: 'John Smith',
    pickupDate: '2024-01-15',
    deliveryDate: '2024-01-18',
    cost: 2850.00,
    weight: 2500,
    priority: 'high'
  },
  {
    id: 'SHP-002',
    trackingNumber: 'TRK-2024-002',
    origin: 'Chicago, IL',
    destination: 'Miami, FL',
    status: 'delivered',
    carrier: 'Reliable Logistics',
    driver: 'Sarah Johnson',
    pickupDate: '2024-01-12',
    deliveryDate: '2024-01-14',
    cost: 1950.00,
    weight: 1800,
    priority: 'medium'
  },
  {
    id: 'SHP-003',
    trackingNumber: 'TRK-2024-003',
    origin: 'Seattle, WA',
    destination: 'Denver, CO',
    status: 'pending',
    carrier: 'Mountain Transport',
    driver: 'Mike Wilson',
    pickupDate: '2024-01-16',
    deliveryDate: '2024-01-19',
    cost: 1650.00,
    weight: 1200,
    priority: 'low'
  },
  {
    id: 'SHP-004',
    trackingNumber: 'TRK-2024-004',
    origin: 'Houston, TX',
    destination: 'Phoenix, AZ',
    status: 'delayed',
    carrier: 'Desert Carriers',
    driver: 'Lisa Brown',
    pickupDate: '2024-01-13',
    deliveryDate: '2024-01-16',
    cost: 2200.00,
    weight: 2100,
    priority: 'high'
  },
  {
    id: 'SHP-005',
    trackingNumber: 'TRK-2024-005',
    origin: 'Boston, MA',
    destination: 'Atlanta, GA',
    status: 'in-transit',
    carrier: 'Coastal Logistics',
    driver: 'David Lee',
    pickupDate: '2024-01-14',
    deliveryDate: '2024-01-17',
    cost: 2400.00,
    weight: 1900,
    priority: 'medium'
  }
];

const sampleDrivers: Driver[] = [
  {
    id: 'DRV-001',
    name: 'John Smith',
    phone: '(555) 123-4567',
    email: 'john.smith@logistics.com',
    license: 'CDL-A-123456',
    status: 'on-delivery',
    rating: 4.8,
    totalDeliveries: 156,
    vehicle: 'Freightliner Cascadia'
  },
  {
    id: 'DRV-002',
    name: 'Sarah Johnson',
    phone: '(555) 234-5678',
    email: 'sarah.johnson@logistics.com',
    license: 'CDL-A-234567',
    status: 'available',
    rating: 4.9,
    totalDeliveries: 203,
    vehicle: 'Peterbilt 579'
  },
  {
    id: 'DRV-003',
    name: 'Mike Wilson',
    phone: '(555) 345-6789',
    email: 'mike.wilson@logistics.com',
    license: 'CDL-A-345678',
    status: 'off-duty',
    rating: 4.6,
    totalDeliveries: 89,
    vehicle: 'Kenworth T680'
  }
];

const sampleCarriers: Carrier[] = [
  {
    id: 'CAR-001',
    name: 'FastFreight Express',
    contact: 'Robert Davis',
    phone: '(555) 456-7890',
    email: 'robert@fastfreight.com',
    rating: 4.7,
    totalShipments: 1247,
    status: 'active',
    specialties: ['Express', 'Refrigerated', 'Hazmat']
  },
  {
    id: 'CAR-002',
    name: 'Reliable Logistics',
    contact: 'Jennifer White',
    phone: '(555) 567-8901',
    email: 'jennifer@reliable.com',
    rating: 4.9,
    totalShipments: 2156,
    status: 'active',
    specialties: ['General Freight', 'Oversized']
  },
  {
    id: 'CAR-003',
    name: 'Mountain Transport',
    contact: 'Thomas Anderson',
    phone: '(555) 678-9012',
    email: 'thomas@mountain.com',
    rating: 4.5,
    totalShipments: 892,
    status: 'active',
    specialties: ['Flatbed', 'Heavy Haul']
  }
];

// Status Badge Component
const StatusBadge = ({ status }: { status: string }) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'pending':
        return { color: 'bg-yellow-100 text-yellow-800', icon: Clock };
      case 'in-transit':
        return { color: 'bg-blue-100 text-blue-800', icon: Truck };
      case 'delivered':
        return { color: 'bg-green-100 text-green-800', icon: CheckCircle };
      case 'delayed':
        return { color: 'bg-red-100 text-red-800', icon: AlertTriangle };
      case 'available':
        return { color: 'bg-green-100 text-green-800', icon: CheckCircle };
      case 'on-delivery':
        return { color: 'bg-blue-100 text-blue-800', icon: Truck };
      case 'off-duty':
        return { color: 'bg-gray-100 text-gray-800', icon: Clock };
      case 'active':
        return { color: 'bg-green-100 text-green-800', icon: CheckCircle };
      case 'inactive':
        return { color: 'bg-red-100 text-red-800', icon: AlertTriangle };
      default:
        return { color: 'bg-gray-100 text-gray-800', icon: Clock };
    }
  };

  const config = getStatusConfig(status);
  const Icon = config.icon;

  return (
    <Badge className={`${config.color} flex items-center gap-1`}>
      <Icon className="w-3 h-3" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

// Priority Badge Component
const PriorityBadge = ({ priority }: { priority: string }) => {
  const getPriorityConfig = (priority: string) => {
    switch (priority) {
      case 'high':
        return { color: 'bg-red-100 text-red-800', text: 'High Priority' };
      case 'medium':
        return { color: 'bg-yellow-100 text-yellow-800', text: 'Medium Priority' };
      case 'low':
        return { color: 'bg-green-100 text-green-800', text: 'Low Priority' };
      default:
        return { color: 'bg-gray-100 text-gray-800', text: 'Unknown' };
    }
  };

  const config = getPriorityConfig(priority);

  return (
    <Badge className={config.color}>
      {config.text}
    </Badge>
  );
};

// Main Dashboard Component
const LogisticsManagementDashboard: React.FC = () => {
  const { toast } = useToast();
  const [shipments, setShipments] = useState<Shipment[]>(sampleShipments);
  const [drivers, setDrivers] = useState<Driver[]>(sampleDrivers);
  const [carriers, setCarriers] = useState<Carrier[]>(sampleCarriers);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddShipmentOpen, setIsAddShipmentOpen] = useState(false);
  const [isEditShipmentOpen, setIsEditShipmentOpen] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const [newShipment, setNewShipment] = useState({
    trackingNumber: '',
    origin: '',
    destination: '',
    carrier: '',
    driver: '',
    pickupDate: '',
    deliveryDate: '',
    cost: '',
    weight: '',
    priority: 'medium'
  });

  // Filter shipments based on search and status
  const filteredShipments = shipments.filter(shipment => {
    const matchesSearch = shipment.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.carrier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || shipment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Handle form submission for new shipment
  const handleAddShipment = (e: React.FormEvent) => {
    e.preventDefault();
    const shipment: Shipment = {
      id: `SHP-${Date.now()}`,
      trackingNumber: newShipment.trackingNumber,
      origin: newShipment.origin,
      destination: newShipment.destination,
      status: 'pending',
      carrier: newShipment.carrier,
      driver: newShipment.driver,
      pickupDate: newShipment.pickupDate,
      deliveryDate: newShipment.deliveryDate,
      cost: parseFloat(newShipment.cost),
      weight: parseFloat(newShipment.weight),
      priority: newShipment.priority as 'low' | 'medium' | 'high'
    };

    setShipments([...shipments, shipment]);
    setNewShipment({
      trackingNumber: '',
      origin: '',
      destination: '',
      carrier: '',
      driver: '',
      pickupDate: '',
      deliveryDate: '',
      cost: '',
      weight: '',
      priority: 'medium'
    });
    setIsAddShipmentOpen(false);
    toast({
      title: "Shipment Added",
      description: `Successfully added shipment ${shipment.trackingNumber}`,
    });
  };

  // Handle shipment deletion
  const handleDeleteShipment = (id: string) => {
    setShipments(shipments.filter(s => s.id !== id));
    toast({
      title: "Shipment Deleted",
      description: "Shipment has been successfully deleted",
    });
  };

  // Handle shipment status update
  const handleStatusUpdate = (id: string, newStatus: Shipment['status']) => {
    setShipments(shipments.map(s => 
      s.id === id ? { ...s, status: newStatus } : s
    ));
    toast({
      title: "Status Updated",
      description: `Shipment status updated to ${newStatus}`,
    });
  };

  // Calculate dashboard metrics
  const totalShipments = shipments.length;
  const activeShipments = shipments.filter(s => s.status === 'in-transit').length;
  const deliveredShipments = shipments.filter(s => s.status === 'delivered').length;
  const totalRevenue = shipments.reduce((sum, s) => sum + s.cost, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Logistics Management Dashboard</h1>
            <p className="text-gray-600 mt-1">Monitor shipments, drivers, and carriers in real-time</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => window.location.reload()}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Shipments</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalShipments}</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Shipments</CardTitle>
              <Truck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeShipments}</div>
              <p className="text-xs text-muted-foreground">
                Currently in transit
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Delivered</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{deliveredShipments}</div>
              <p className="text-xs text-muted-foreground">
                Successfully completed
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +8% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Shipments Section */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle>Shipments</CardTitle>
                <CardDescription>Manage and track all shipments</CardDescription>
              </div>
              <Dialog open={isAddShipmentOpen} onOpenChange={setIsAddShipmentOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Shipment
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Add New Shipment</DialogTitle>
                    <DialogDescription>
                      Fill in the details to create a new shipment
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddShipment} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="trackingNumber">Tracking Number</Label>
                        <Input
                          id="trackingNumber"
                          value={newShipment.trackingNumber}
                          onChange={(e) => setNewShipment({...newShipment, trackingNumber: e.target.value})}
                          placeholder="TRK-2024-XXX"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="priority">Priority</Label>
                        <Select value={newShipment.priority} onValueChange={(value) => setNewShipment({...newShipment, priority: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="origin">Origin</Label>
                        <Input
                          id="origin"
                          value={newShipment.origin}
                          onChange={(e) => setNewShipment({...newShipment, origin: e.target.value})}
                          placeholder="City, State"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="destination">Destination</Label>
                        <Input
                          id="destination"
                          value={newShipment.destination}
                          onChange={(e) => setNewShipment({...newShipment, destination: e.target.value})}
                          placeholder="City, State"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="carrier">Carrier</Label>
                        <Select value={newShipment.carrier} onValueChange={(value) => setNewShipment({...newShipment, carrier: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select carrier" />
                          </SelectTrigger>
                          <SelectContent>
                            {carriers.map(carrier => (
                              <SelectItem key={carrier.id} value={carrier.name}>{carrier.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="driver">Driver</Label>
                        <Select value={newShipment.driver} onValueChange={(value) => setNewShipment({...newShipment, driver: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select driver" />
                          </SelectTrigger>
                          <SelectContent>
                            {drivers.map(driver => (
                              <SelectItem key={driver.id} value={driver.name}>{driver.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="pickupDate">Pickup Date</Label>
                        <Input
                          id="pickupDate"
                          type="date"
                          value={newShipment.pickupDate}
                          onChange={(e) => setNewShipment({...newShipment, pickupDate: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="deliveryDate">Delivery Date</Label>
                        <Input
                          id="deliveryDate"
                          type="date"
                          value={newShipment.deliveryDate}
                          onChange={(e) => setNewShipment({...newShipment, deliveryDate: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="cost">Cost ($)</Label>
                        <Input
                          id="cost"
                          type="number"
                          step="0.01"
                          value={newShipment.cost}
                          onChange={(e) => setNewShipment({...newShipment, cost: e.target.value})}
                          placeholder="0.00"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="weight">Weight (lbs)</Label>
                        <Input
                          id="weight"
                          type="number"
                          value={newShipment.weight}
                          onChange={(e) => setNewShipment({...newShipment, weight: e.target.value})}
                          placeholder="0"
                          required
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setIsAddShipmentOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">Add Shipment</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search shipments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-transit">In Transit</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="delayed">Delayed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tracking</TableHead>
                  <TableHead>Route</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Carrier</TableHead>
                  <TableHead>Driver</TableHead>
                  <TableHead>Cost</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredShipments.map((shipment) => (
                  <TableRow key={shipment.id}>
                    <TableCell className="font-medium">
                      <div>
                        <div className="font-semibold">{shipment.trackingNumber}</div>
                        <div className="text-sm text-gray-500">ID: {shipment.id}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <MapPin className="w-3 h-3 mr-1 text-green-600" />
                          {shipment.origin}
                        </div>
                        <div className="flex items-center text-sm">
                          <MapPin className="w-3 h-3 mr-1 text-red-600" />
                          {shipment.destination}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={shipment.status} />
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{shipment.carrier}</div>
                        <div className="text-sm text-gray-500">{shipment.driver}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-2 text-gray-400" />
                        {shipment.driver}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">${shipment.cost.toLocaleString()}</div>
                      <div className="text-sm text-gray-500">{shipment.weight} lbs</div>
                    </TableCell>
                    <TableCell>
                      <PriorityBadge priority={shipment.priority} />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedShipment(shipment);
                            setIsEditShipmentOpen(true);
                          }}
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Shipment</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete shipment {shipment.trackingNumber}? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteShipment(shipment.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                        <Select
                          value={shipment.status}
                          onValueChange={(value) => handleStatusUpdate(shipment.id, value as Shipment['status'])}
                        >
                          <SelectTrigger className="w-[120px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="in-transit">In Transit</SelectItem>
                            <SelectItem value="delivered">Delivered</SelectItem>
                            <SelectItem value="delayed">Delayed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Drivers and Carriers Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Drivers */}
          <Card>
            <CardHeader>
              <CardTitle>Active Drivers</CardTitle>
              <CardDescription>Driver status and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {drivers.map((driver) => (
                  <div key={driver.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium">{driver.name}</div>
                        <div className="text-sm text-gray-500">{driver.phone}</div>
                        <div className="text-sm text-gray-500">{driver.vehicle}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <StatusBadge status={driver.status} />
                      <div className="text-sm text-gray-500 mt-1">
                        Rating: {driver.rating}/5.0
                      </div>
                      <div className="text-sm text-gray-500">
                        {driver.totalDeliveries} deliveries
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Carriers */}
          <Card>
            <CardHeader>
              <CardTitle>Carrier Partners</CardTitle>
              <CardDescription>Carrier information and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {carriers.map((carrier) => (
                  <div key={carrier.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <Truck className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium">{carrier.name}</div>
                        <div className="text-sm text-gray-500">{carrier.contact}</div>
                        <div className="text-sm text-gray-500">{carrier.phone}</div>
                        <div className="flex gap-1 mt-1">
                          {carrier.specialties.map((specialty, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <StatusBadge status={carrier.status} />
                      <div className="text-sm text-gray-500 mt-1">
                        Rating: {carrier.rating}/5.0
                      </div>
                      <div className="text-sm text-gray-500">
                        {carrier.totalShipments} shipments
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and operations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex-col">
                <Plus className="w-6 h-6 mb-2" />
                <span>New Shipment</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <User className="w-6 h-6 mb-2" />
                <span>Add Driver</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <Truck className="w-6 h-6 mb-2" />
                <span>Add Carrier</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <TrendingUp className="w-6 h-6 mb-2" />
                <span>View Reports</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LogisticsManagementDashboard;
